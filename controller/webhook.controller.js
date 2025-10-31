const Prisma = require("../config/db.config");
const {
  OUTRO_RESPONSE,
  NAME_RESPONSE,
  SINGNATURE_RESPONSE,
} = require("../utils/response");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const webhookSecret = process.env.TEST_WEBHOOK;
const membershipWebhookSecret = process.env.MEMBERSHIP_WEBHOOK_SECRET;
const renewalWebhookSecret = process.env.RENEW_WEBHOOK_SECRET;
const echoWebhookSecret = process.env.ECHO_WEBHOOK_SECRET;
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { ERROR_STATUS } = require("../utils/status");
const corsUrl = process.env.CORS_URL;
const supportMail = process.env.SUPPORT_MAIL;
const USER = process.env.EMAIL_USER;
const PASSWORD = process.env.EMAIL_PASSWORD;
const SERVER_KEY = process.env.EMAIL_SERVER_KEY;
const SERVER_PORT = process.env.EMAIL_SERVER_PORT;

// membership webhook
async function membershipWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      membershipWebhookSecret
    );
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const transaction = await Prisma.userMembership.findFirst({
        where: {
          transactionId: session.id,
        },
      });
      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      const id = transaction?.id;
      const plan = transaction?.duration;
      const now = new Date();
      const existUser = await Prisma.user.findUnique({
        where: {
          id: transaction?.userId,
        },
      });
      const { landerName, email, discount } = existUser || {};
      let activateAt;
      if (plan === "monthly") {
        activateAt = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          now.getDate()
        );
      } else {
        const monthsToAdd = discount ? 14 : 12;
        activateAt = new Date(
          now.getFullYear(),
          now.getMonth() + monthsToAdd,
          now.getDate()
        );
      }
      const formattedActivateAt = activateAt
        .toISOString()
        .replace("Z", "+00:00");
      await Prisma.userMembership.update({
        where: { id },
        data: {
          activate_at: formattedActivateAt,
          status: "ACTIVATE",
        },
      });
      await sendNotificationEmail(
        landerName,
        email,
        `Your membership has been activated. Please check your user dashboard to see your selected plan. You have chosen ${plan} plan.`
      );
    }
    return res.status(200).json({ received: true });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// renewal membership webhook
async function renewalWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, renewalWebhookSecret);
    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object;
      let existUser;
      if (invoice.subscription) {
        const subscription = await stripe.subscriptions.retrieve(
          invoice.subscription
        );
        const userId = subscription.metadata.userId;
        existUser = await Prisma.user.findUnique({
          where: {
            id: userId,
          },
        });
      } else {
        const customer = await stripe.customers.retrieve(invoice.customer);
        existUser = await Prisma.user.findUnique({
          where: {
            email: customer.email,
          },
        });
      }
      const { landerName, email, frequency, planKey } = existUser || {};
      const baseDate = new Date(
        existUser.activate_at && new Date(existUser.activate_at) > new Date()
          ? existUser.activate_at
          : new Date()
      );
      const newExpireDate =
        frequency === "monthly"
          ? new Date(baseDate.setMonth(baseDate.getMonth() + 1))
          : new Date(baseDate.setFullYear(baseDate.getFullYear() + 1));
      await Prisma.userMembership.update({
        where: { userId: existUser?.id },
        data: {
          activate_at: newExpireDate.toISOString(),
          status: "ACTIVATE",
        },
      });
      await sendNotificationEmail(
        landerName,
        email,
        `Your membership has been successfully renewed. You can view the details of your selected plan in your user dashboard. You are now subscribed to the ${planKey} plan.`
      );
    }
    return res.status(200).json({ received: true });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// echo webhook
async function echoWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, echoWebhookSecret);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const transaction = await Prisma.echo.findFirst({
        where: {
          transactionId: session.id,
        },
      });
      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      const id = transaction?.id;
      await Prisma.echo.update({
        where: {
          id: id,
        },
        data: {
          status: "PAID",
        },
      });
    }
    return res.status(200).json({ received: true });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// send notification email
async function sendNotificationEmail(companyName, email, message) {
  let config = {
    host: SERVER_KEY,
    port: SERVER_PORT,
    secure: true,
    auth: {
      user: USER,
      pass: PASSWORD,
    },
  };
  const transporter = nodemailer.createTransport(config);

  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: NAME_RESPONSE,
      link: corsUrl,
      copyright: OUTRO_RESPONSE,
    },
  });

  const emailTemplate = {
    body: {
      name: `${companyName}`,
      intro: "You have recive a notification from MY BRAND LIFE",
      signature: SINGNATURE_RESPONSE,
      outro: `
        <p style="font-size: 20px; color: #777;">Congratulations 😄</p>
        <p style="font-size: 14px; color: #777;">${message}</p>
        <p style="font-size: 14px; color: #4285F4;"><a href="${corsUrl}">${NAME_RESPONSE}</a></p>
        <p style="font-size: 14px; color: #4285F4;">E-mail: ${supportMail}</p>
      `,
    },
  };
  const emailBody = mailGenerator.generate(emailTemplate);
  const mailOptions = {
    from: USER,
    to: email,
    subject: "Notification from My Brand Life",
    html: emailBody,
  };
  await transporter.sendMail(mailOptions);
}

module.exports = { membershipWebhook, echoWebhook, renewalWebhook };
