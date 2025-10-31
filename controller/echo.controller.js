const Prisma = require("../config/db.config");
const {
  DATA_NOT_FOUND_MESSAGE,
  FORM_SUBMITION_SUCCESSFUL_MESSAGE,
  QUERY_SUCCESSFUL_MESSAGE,
  UPDATE_SUCCESSFUL_MESSAGE,
  DELETE_SUCCESS_MESSAGE,
  SINGNATURE_RESPONSE,
  NAME_RESPONSE,
  OUTRO_RESPONSE,
  CONNECTION_REDIRECT_MESSAGE,
} = require("../utils/response");
const { ERROR_STATUS, SUCCESS_STATUS } = require("../utils/status");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const baseURL = process.env.CORS_URL;
const { getIo } = require("../middleware/socket");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const corsUrl = process.env.CORS_URL;
const supportMail = process.env.SUPPORT_MAIL;
const USER = process.env.EMAIL_USER;
const PASSWORD = process.env.EMAIL_PASSWORD;
const SERVER_KEY = process.env.EMAIL_SERVER_KEY;
const SERVER_PORT = process.env.EMAIL_SERVER_PORT;

// get all echo
async function getAllEcho(req, res) {
  const {
    page = 1,
    limit = 10,
    searchBy = "",
    statusBy = "",
    userId = "",
  } = req.query;
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const skip = (pageNumber - 1) * limitNumber;
  let filter = {};
  if (searchBy) {
    filter.name = {
      contains: searchBy,
      mode: "insensitive",
    };
  }
  if (statusBy) {
    filter.status = statusBy;
  }
  if (userId) {
    filter.userId = userId;
  }

  try {
    const echo = await Prisma.echo.findMany({
      skip: skip,
      take: limitNumber,
      where: filter,
      include: {
        user: true,
      },
    });
    const totalEcho = await Prisma.echo.count({ where: filter });
    const totalPage = Math.ceil(totalEcho / limitNumber);
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: QUERY_SUCCESSFUL_MESSAGE,
      data: {
        echo,
        totalPage,
        totalEcho,
        currentPage: pageNumber,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// get all echo by ander
async function getAllEchoByLander(req, res) {
  const { landerName } = req.query;
  try {
    const echo = await Prisma.echo.findMany({
      where: {
        user: {
          landerName: landerName,
        },
        status: "CONFIRMED",
      },
      include: {
        user: true,
      },
      orderBy: {
        create_at: "desc",
      },
    });
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: QUERY_SUCCESSFUL_MESSAGE,
      echo: echo,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// get one echo
async function getOneEcho(req, res) {
  const id = req.params.id;
  try {
    const existEcho = await Prisma.echo.findUnique({
      where: {
        id: id,
      },
    });
    if (!existEcho) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: QUERY_SUCCESSFUL_MESSAGE,
      echo: existEcho,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// create echo
async function createEcho(req, res) {
  const { name, email, message, tip, userId, city, shoutOut } = req.body;
  try {
    const existUser = await Prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existUser) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    let data;
    if (tip) {
      data = await createPayment(
        Number(tip),
        userId,
        name,
        existUser?.landerName
      );
      newEcho = await Prisma.echo.create({
        data: {
          name: name,
          email: email,
          message: message,
          tip: Number(tip),
          userId: userId,
          transactionId: data?.transactionId,
          shoutOut: shoutOut,
          city: city,
        },
        include: {
          user: true,
        },
      });
    } else {
      newEcho = await Prisma.echo.create({
        data: {
          name: name,
          email: email,
          message: message,
          userId: userId,
          shoutOut: shoutOut,
          city: city,
        },
        include: {
          user: true,
        },
      });
    }

    res.status(200).json({
      status: SUCCESS_STATUS,
      message: FORM_SUBMITION_SUCCESSFUL_MESSAGE,
      pageUrl: data?.pageUrl,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// update echo
async function updateEcho(req, res) {
  const { name, email, message, tip, shoutOut, city, status } = req.body;
  const id = req.params.id;
  try {
    const existEcho = await Prisma.echo.findUnique({
      where: {
        id: id,
      },
    });
    if (!existEcho) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    await Prisma.echo.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        message: message,
        tip: Number(tip),
        shoutOut: shoutOut,
        city: city,
        status: status,
      },
    });

    res.status(200).json({
      status: SUCCESS_STATUS,
      message: UPDATE_SUCCESSFUL_MESSAGE,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// update echo
async function deleteEcho(req, res) {
  const id = req.params.id;
  try {
    const existEcho = await Prisma.echo.findUnique({
      where: {
        id: id,
      },
    });
    if (!existEcho) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    await Prisma.echo.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: DELETE_SUCCESS_MESSAGE,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// connect stripe account
async function connectStripeAccount(req, res) {
  const { id } = req.body;

  try {
    let accountId;
    const existUser = await Prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!existUser.stripeAccountId) {
      const newAccount = await stripe.accounts.create({
        type: "express",
        country: "US",
        email: existUser?.user?.email,
        capabilities: {
          transfers: { requested: true },
          card_payments: { requested: true },
        },
      });
      await Prisma.user.update({
        where: { id: id },
        data: { stripeAccountId: newAccount?.id },
      });
      accountId = newAccount?.id;
    } else {
      accountId = existUser?.stripeAccountId;
    }
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.CORS_URL}`,
      return_url: `${process.env.CORS_URL}/stripe/connect/success`,
      type: "account_onboarding",
    });
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: CONNECTION_REDIRECT_MESSAGE,
      url: accountLink.url,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// check stripe connection
async function checkStripeConnection(req, res) {
  const id = req.params.id;
  try {
    const existUser = await Prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!existUser) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    if (!existUser.stripeAccountId) {
      return res.json({
        status: ERROR_STATUS,
        message: USER_STRIPE_CONNECTION_FAILED,
        connected: false,
        ready: false,
        stripeAccountId: null,
      });
    }
    const account = await stripe.accounts.retrieve(existUser.stripeAccountId);
    const connected = account.details_submitted;
    const ready = account.charges_enabled && account.payouts_enabled;

    res.json({
      status: SUCCESS_STATUS,
      message: QUERY_SUCCESSFUL_MESSAGE,
      connected,
      ready,
      stripeAccountId: existUser.stripeAccountId,
      accountStatus: account.requirements,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// update status event
async function toggleEcho(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const existTemplete = await Prisma.userTemplete.findFirst({
      where: {
        userId: id,
      },
    });
    if (!existTemplete) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }

    await Prisma.userTemplete.update({
      where: {
        id: existTemplete?.id,
      },
      data: {
        enableEcho: status,
      },
    });
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: UPDATE_SUCCESSFUL_MESSAGE,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// update event status
async function updateEchoStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const existEcho = await Prisma.echo.findUnique({
      where: {
        id: id,
      },
    });
    if (!existEcho) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }

    const updateEcho = await Prisma.echo.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
      include: {
        user: true,
      },
    });
    const { email, name } = existEcho || {};
    if (status === "CONFIRMED") {
      const io = getIo();
      io.emit("newEcho", updateEcho);
      await sendNotificationEmail(
        name,
        email,
        "We are pleased to inform you that your request has been confirmed. Your request is now live on the feed. Thank you for your submission.",
        "Echo request Canceled"
      );
    }
    if (status === "CANCELED") {
      const io = getIo();
      io.emit("CancelEcho", updateEcho);
      await sendNotificationEmail(
        name,
        email,
        "We're sorry to inform you that your echo request is cancel at this time. Please feel free to try again or contact our support team for assistance.",
        "Echo request Canceled"
      );
    }

    if (status === "REJECTED") {
      const io = getIo();
      io.emit("rejectEcho", updateEcho);
      await sendNotificationEmail(
        name,
        email,
        "We're sorry to inform you that your echo request is reject at this time. Please feel free to try again or contact our support team for assistance.",
        "Echo request rejected"
      );
    }
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: UPDATE_SUCCESSFUL_MESSAGE,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// create tip payment
async function createPayment(amount, userId, name, landerName) {
  const getUrl = process.env.DOMAIN_URL;
  const splitUrl = getUrl?.split(",");
  const mainDomain = splitUrl?.[0];
  const successUrl = `${mainDomain}/payment/success/${landerName}`;
  const failedUrl = `${baseURL}`;
  const existUser = await Prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  const { username, email, stripeAccountId } = existUser || {};

  const existingCustomer = await stripe.customers.list(
    { email },
    { stripeAccount: stripeAccountId }
  );
  let customer;
  if (existingCustomer.data.length > 0) {
    customer = existingCustomer.data[0];
  } else {
    customer = await stripe.customers.create(
      { email, name: username },
      { stripeAccount: stripeAccountId }
    );
  }

  const session = await stripe.checkout.sessions.create(
    {
      payment_method_types: ["card"],
      customer: customer.id,
      billing_address_collection: "required",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],

      mode: "payment",
      invoice_creation: { enabled: true },
      customer_update: {
        address: "auto",
      },
      automatic_tax: { enabled: true },
      success_url: successUrl,
      cancel_url: failedUrl,
      metadata: {
        userId: userId,
        username: username,
        email: email,
      },
    },
    {
      stripeAccount: stripeAccountId,
    }
  );
  const data = {
    pageUrl: session.url,
    transactionId: session.id,
  };
  return data;
}

// send notification email
async function sendNotificationEmail(name, email, message, status) {
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
      name: `${name}`,
      intro: "You have recive a notification from MY BRAND LIFE",
      signature: SINGNATURE_RESPONSE,
      outro: `
        <p style="font-size: 20px; color: #777;">${status}</p>
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

module.exports = {
  getAllEcho,
  getOneEcho,
  createEcho,
  updateEcho,
  deleteEcho,
  connectStripeAccount,
  updateEchoStatus,
  toggleEcho,
  getAllEchoByLander,
  checkStripeConnection,
};
