const Prisma = require("../config/db.config");
const {
  USER_ALREADY_EXIST_MESSAGE,
  REGISTRATION_SUCCESS_MESSAGE,
  NAME_RESPONSE,
  OUTRO_RESPONSE,
  USE_VERIFICATION_CODE_TO_VERIFY_EMAIL_RESPONSE,
  SINGNATURE_RESPONSE,
  IGNORE_EMAIL_RESPONSE,
  EMAIL_VERIFICATION_CODE_RESPONSE,
  DATA_NOT_FOUND_MESSAGE,
  DELETE_SUCCESS_MESSAGE,
  PASSWORD_NOT_MATCH_MESSAGE,
  LOGIN_SUCCESS_MESSAGE,
  QUERY_SUCCESSFUL_MESSAGE,
  UPDATE_SUCCESSFUL_MESSAGE,
  VERIFY_SUCCESSFUL_MESSAGE,
  OTP_INCORRECT_MESSAGE,
  USER_UNVERIFYED_MESSAGE,
  OTP_CODE_SEND_MESSAGE,
  LANDER_ALREADY_EXIST_MESSAGE,
  TOKEN_EXPIRED_MESSAGE,
  UNAUTHORIZE_ERROR_MESSAGE,
  INVALID_TOKEN_MESSAGE,
  LOGOUT_SUCCESSFUL_MESSAGE,
  INVALID_SECURE_KEY_MESSAGE,
  ACCOUNT_IS_DEACTIVATE_MESSAGE,
} = require("../utils/response");
const { ERROR_STATUS, SUCCESS_STATUS } = require("../utils/status");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SecretKey = process.env.SECRET_KEY;
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { createPayment } = require("../middleware/payment.creators");
const { membershipCreator } = require("../middleware/membership.creator");
const corsUrl = process.env.CORS_URL;
const supportMail = process.env.SUPPORT_MAIL;
const USER = process.env.EMAIL_USER;
const PASSWORD = process.env.EMAIL_PASSWORD;
const SERVER_KEY = process.env.EMAIL_SERVER_KEY;
const SERVER_PORT = process.env.EMAIL_SERVER_PORT;
const freeCodes = [
  process.env.FREE_CODE_ONE,
  process.env.FREE_CODE_TOW,
  process.env.FREE_CODE_THREE,
];

// get all user
async function getAllUser(req, res) {
  const { page = 1, limit = 10, statusBy = "", searchBy = "" } = req.query;
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const skip = (pageNumber - 1) * limitNumber;
  const filter = { role: "USER" };
  if (statusBy) {
    filter.status = statusBy;
  }

  if (searchBy) {
    filter.landerName = {
      contains: searchBy,
      mode: "insensitive",
    };
  }
  try {
    const user = await Prisma.user.findMany({
      skip: skip,
      take: limitNumber,
      where: filter,
    });
    const totalUser = await Prisma.user.count({ where: filter });
    const totalPage = Math.ceil(totalUser / limitNumber);
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: QUERY_SUCCESSFUL_MESSAGE,
      data: {
        user,
        totalPage,
        totalUser,
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

// get all user by admin
async function getAllUserByAdmin(req, res) {
  const { role } = req.query;
  try {
    const users = await Prisma.user.findMany({
      where: {
        role: role,
      },
      include: {
        discounts: true,
        extraWisetbands: true,
        membership: true,
        userTemplete: true,
        referralCustomer: true,
        otpModel: true,
      },
    });
    const templates = await Prisma.userTemplete.findMany();
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: QUERY_SUCCESSFUL_MESSAGE,
      users,
      templates,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// get one user
async function getOneUser(req, res) {
  const id = req.params.id;
  try {
    const existUser = await Prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        membership: true,
      },
    });
    if (!existUser) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: QUERY_SUCCESSFUL_MESSAGE,
      user: existUser,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// admin register
async function registerAdmin(req, res) {
  const { email, password } = req.body;
  try {
    bcrypt.hash(password, 10, async function (err, hash) {
      await Prisma.user.create({
        data: {
          email,
          password: hash,
          role: "ADMIN",
          status: "ACTIVATE",
          aggreement: true,
          secureKey: "riccojs@89#",
          username: "riccojs",
        },
      });
      return res.status(201).json({
        status: SUCCESS_STATUS,
        message: REGISTRATION_SUCCESS_MESSAGE,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// register user
async function registerUser(req, res) {
  const {
    domain,
    packageType,
    planKey,
    planPrice,
    planOldPrice,
    frequency,
    email,
    password,
    landerName,
    midName,
    address,
    nickName,
    phone,
    secondEmail,
    aggreement,
    extraRed,
    extraBlack,
    extraGreen,
    extraYellow,
    extraBlue,
    extraWhite,
    extraOrange,
    cardNumber,
    discount,
    referalCode,
  } = req.body;
  try {
    const existUser = await Prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const existUserByLandname = await Prisma.user.findUnique({
      where: {
        landerName: landerName,
      },
    });

    if (existUser) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: USER_ALREADY_EXIST_MESSAGE,
      });
    }
    if (existUserByLandname) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: LANDER_ALREADY_EXIST_MESSAGE,
      });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
      const newUser = await Prisma.user.create({
        data: {
          domain: `${domain}.me`,
          package: packageType,
          planKey,
          planPrice: Number(planPrice),
          planOldPrice: Number(planOldPrice),
          frequency,
          email,
          password: hash,
          landerName,
          midName,
          address,
          nickName,
          phone,
          secondEmail,
          aggreement,
          cardNumber,
          discount: discount,
          role: "USER",
        },
      });

      if (
        extraBlack ||
        extraGreen ||
        extraRed ||
        extraYellow ||
        extraBlue ||
        extraWhite ||
        extraOrange
      ) {
        const extras = [
          { name: "BLACK", count: extraBlack },
          { name: "RED", count: extraRed },
          { name: "GREEN", count: extraGreen },
          { name: "YELLOW", count: extraYellow },
          { name: "BLUE", count: extraBlue },
          { name: "WHITE", count: extraWhite },
          { name: "ORANGE", count: extraOrange },
        ];
        for (const item of extras) {
          await Prisma.extraWisetbands.create({
            data: {
              name: item.name,
              count: Number(item.count),
              userId: newUser.id,
            },
          });
        }
      }
      if (referalCode) {
        if (!freeCodes?.includes(referalCode)) {
          const existReferal = await Prisma.referralCustomer.findUnique({
            where: {
              referalCode: referalCode,
            },
          });
          await Prisma.referralCustomer.update({
            where: {
              id: existReferal.id,
            },
            data: {
              joined: existReferal.joined ? existReferal.joined + 1 : 1,
            },
          });
        }
      }

      await Prisma.referralCustomer.create({
        data: {
          referalCode: landerName,
          userId: newUser.id,
          tier: "BASIC",
          joined: 0,
        },
      });

      await registerCodeSendEmail(landerName, email, newUser.id, domain);

      let resData;
      if (freeCodes?.includes(referalCode)) {
        resData = {
          pageUrl: `${corsUrl}/auth/verify`,
        };
        await membershipCreator(
          newUser,
          planKey,
          planPrice,
          frequency,
          planOldPrice,
          null,
          true,
          frequency
        );
      } else {
        resData = await createPayment(newUser);
      }
      return res.status(201).json({
        status: SUCCESS_STATUS,
        message: REGISTRATION_SUCCESS_MESSAGE,
        pageUrl: resData.pageUrl,
        user: newUser,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// verify user
async function verifyUser(req, res) {
  const { code } = req.body;
  try {
    const existOtp = await Prisma.otpModel.findUnique({
      where: {
        code: Number(code),
      },
    });
    if (!existOtp) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    if (existOtp) {
      await Prisma.user.update({
        where: {
          id: existOtp.userId,
        },
        data: {
          status: "ACTIVATE",
        },
      });
      let currentTime = new Date().getTime();
      let diffrenceTime = existOtp.expireIn - currentTime;
      if (diffrenceTime < 0) {
        res.status(500).json({ message: TOKEN_EXPIRED_MESSAGE });
      } else {
        res.status(200).json({ message: VERIFY_SUCCESSFUL_MESSAGE });
      }
    } else {
      res.status(500).json({ message: OTP_INCORRECT_MESSAGE });
    }
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// verify user
async function verifyUserByAdmin(req, res) {
  const { id } = req.body;
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
    await Prisma.user.update({
      where: {
        id: id,
      },
      data: {
        status: "ACTIVATE",
      },
    });
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: VERIFY_SUCCESSFUL_MESSAGE,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// login admin
async function loginAdmin(req, res) {
  const { email, password, secureKey } = req.body;

  try {
    const existUser = await Prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existUser) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }

    if (existUser?.secureKey !== secureKey) {
      return res.status(400).json({
        status: ERROR_STATUS,
        message: INVALID_SECURE_KEY_MESSAGE,
      });
    }
    const matchPassword = await bcrypt.compare(password, existUser.password);
    const token = jwt.sign(
      { email: existUser.email, id: existUser.id },
      SecretKey,
      { expiresIn: "7d" }
    );
    if (!matchPassword) {
      return res.status(400).json({
        status: ERROR_STATUS,
        message: PASSWORD_NOT_MATCH_MESSAGE,
      });
    }
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: LOGIN_SUCCESS_MESSAGE,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// login User
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const existUser = await Prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existUser) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }

    if (existUser?.status !== "ACTIVATE") {
      return res.status(400).json({
        status: ERROR_STATUS,
        message: USER_UNVERIFYED_MESSAGE,
      });
    }
    const existTemplate = await Prisma.userTemplete.findFirst({
      where: {
        userId: existUser?.id,
      },
    });
    const matchPassword = await bcrypt.compare(password, existUser.password);
    const token = jwt.sign(
      { email: existUser.email, id: existUser.id },
      SecretKey,
      { expiresIn: "7d" }
    );
    if (!matchPassword) {
      return res.status(400).json({
        status: ERROR_STATUS,
        message: PASSWORD_NOT_MATCH_MESSAGE,
      });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    const findStatus = existTemplate?.verify;
    const responseUrl = findStatus ? "/dashboard" : "/build-your-lander";

    res.status(200).json({
      status: SUCCESS_STATUS,
      message: LOGIN_SUCCESS_MESSAGE,
      url: responseUrl,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// login User
async function logoutUser(req, res) {
  const { email } = req.body;
  try {
    const existUser = await Prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!existUser) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: LOGOUT_SUCCESSFUL_MESSAGE,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// login auth user
async function userLogged(req, res) {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      status: ERROR_STATUS,
      message: UNAUTHORIZE_ERROR_MESSAGE,
    });

  try {
    const decoded = jwt.verify(token, SecretKey);
    const user = await Prisma.user.findUnique({
      where: { id: decoded.id, status: "ACTIVATE" },
      include: {
        userTemplete: true,
        membership: true,
      },
    });
    return res.status(200).json({
      status: SUCCESS_STATUS,
      message: QUERY_SUCCESSFUL_MESSAGE,
      user: user,
    });
  } catch (err) {
    res.status(401).json({ message: INVALID_TOKEN_MESSAGE });
  }
}

// send reset code
async function sendResetCode(req, res) {
  const { email } = req.body;
  try {
    const existUser = await Prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!existUser) {
      return res.status(404).json({
        status: ERROR_STATUS,
        messahe: DATA_NOT_FOUND_MESSAGE,
      });
    }
    await sendVerificationCode(existUser?.landerName, email, existUser.id);
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: OTP_CODE_SEND_MESSAGE,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// reset user password
async function resetUser(req, res) {
  const { email, password } = req.body;
  try {
    const existUser = await Prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!existUser) {
      return res.status(404).json({
        status: ERROR_STATUS,
        messahe: DATA_NOT_FOUND_MESSAGE,
      });
    }
    bcrypt.hash(password, 10, async function (err, hash) {
      const updatePassword = await Prisma.user.update({
        where: {
          email: email,
        },
        data: {
          password: hash,
        },
      });
      res.status(201).json({
        status: SUCCESS_STATUS,
        message: UPDATE_SUCCESSFUL_MESSAGE,
        user: updatePassword,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// update user
async function updateUser(req, res) {
  const {
    landerName,
    midName,
    nickName,
    secondEmail,
    lastName,
    firstName,
    cardNumber,
    username,
    phone,
    address,
    secureKey,
  } = req.body;
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
    const basePath = `${req.protocol}://${req.get("host")}/public/`;
    const profileFile = req.file?.originalname.split(" ").join("-");
    await Prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: username,
        firstName: firstName,
        midName: midName,
        lastName: lastName,
        secondEmail: secondEmail,
        phone: phone,
        address: address,
        landerName: landerName,
        nickName: nickName,
        cardNumber: cardNumber,
        secureKey: secureKey,
        profile: profileFile ? `${basePath}${profileFile}` : existUser?.profile,
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

// update user
async function updateUserByAdmin(req, res) {
  const {
    username,
    firstName,
    midName,
    lastName,
    email,
    secondEmail,
    phone,
    address,
    landerName,
    nickName,
    package,
    frequency,
    status,
    domain,
    cardNumber,
  } = req.body;
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
    const basePath = `${req.protocol}://${req.get("host")}/public/`;
    const profileFile = req.file?.originalname.split(" ").join("-");
    await Prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: username,
        firstName: firstName,
        midName: midName,
        email: email,
        package: package,
        frequency: frequency,
        status: status,
        domain: domain,
        lastName: lastName,
        secondEmail: secondEmail,
        phone: phone,
        address: address,
        landerName: landerName,
        nickName: nickName,
        cardNumber: cardNumber,
        profile: profileFile ? `${basePath}${profileFile}` : existUser?.profile,
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

// update user
async function updateUserMembership(req, res) {
  const { plan, price, duration, activate_at, oldPrice, status } = req.body;
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
    await Prisma.userMembership.update({
      where: {
        userId: id,
      },
      data: {
        plan,
        price: Number(price),
        duration,
        activate_at: new Date(activate_at),
        oldPrice: Number(oldPrice),
        status,
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

// update password
async function updatePassword(req, res) {
  const { password, oldPassword } = req.body;
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
    const matchPassword = await bcrypt.compare(oldPassword, existUser.password);
    if (!matchPassword) {
      return res.status(400).json({
        status: ERROR_STATUS,
        message: PASSWORD_NOT_MATCH_MESSAGE,
      });
    }
    bcrypt.hash(password, 10, async function (err, hash) {
      await Prisma.user.update({
        where: {
          id: id,
        },
        data: {
          password: hash,
        },
      });

      res.status(200).json({
        status: SUCCESS_STATUS,
        message: UPDATE_SUCCESSFUL_MESSAGE,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      error: error.message,
    });
  }
}

// update password
async function updateUserPasswordByAdmin(req, res) {
  const { password } = req.body;
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
    bcrypt.hash(password, 10, async function (err, hash) {
      await Prisma.user.update({
        where: {
          id: id,
        },
        data: {
          password: hash,
        },
      });
      res.status(200).json({
        status: SUCCESS_STATUS,
        message: UPDATE_SUCCESSFUL_MESSAGE,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      error: error.message,
    });
  }
}

// delete user
async function deleteUser(req, res) {
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
    const deleteUser = await Prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: DELETE_SUCCESS_MESSAGE,
      user: deleteUser,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// deactivate account
async function togglrUserActivation(req, res) {
  const id = req.params.id;
  const { status } = req.body;
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
    await Prisma.user.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
    await Prisma.userMembership.update({
      where: {
        userId: id,
      },
      data: {
        status: status,
      },
    });
    await Prisma.userTemplete.updateMany({
      where: {
        userId: id,
      },
      data: {
        status: status,
      },
    });
    const existEvents = await Prisma.event.findMany({
      where: {
        userId: id,
      },
    });
    if (existEvents?.length > 0) {
      await Prisma.event.updateMany({
        where: {
          userId: id,
        },
        data: {
          status: status,
        },
      });
    }
    const existEcho = await Prisma.echo.findMany({
      where: {
        userId: id,
      },
    });
    if (existEcho?.length > 0) {
      await Prisma.echo.updateMany({
        where: {
          userId: id,
        },
        data: {
          status: status,
        },
      });
    }
    await deactivateEmailSend(existUser?.landerName, existUser?.email);
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: ACCOUNT_IS_DEACTIVATE_MESSAGE,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// send verification email
async function sendVerificationCode(companyName, email, userId) {
  const verificationCode = Math.floor(100000 + Math.random() * 900000);

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
      intro: USE_VERIFICATION_CODE_TO_VERIFY_EMAIL_RESPONSE,
      signature: SINGNATURE_RESPONSE,
      table: {
        data: [
          {
            "Your Verification Code": verificationCode,
          },
        ],
      },
      outro: `<p style="font-size: 14px; color: #777;">${IGNORE_EMAIL_RESPONSE}</p>
        <p style="font-size: 14px; color: #4285F4;"><a href="${corsUrl}">${NAME_RESPONSE}</a></p>
        <p style="font-size: 14px; color: #4285F4;">E-mail: ${supportMail}</p>`,
    },
  };
  const emailBody = mailGenerator.generate(emailTemplate);
  const mailOptions = {
    from: USER,
    to: email,
    subject: EMAIL_VERIFICATION_CODE_RESPONSE,
    html: emailBody,
  };
  await transporter.sendMail(mailOptions);
  await Prisma.otpModel.create({
    data: {
      code: verificationCode,
      email: email,
      userId: userId,
      expireIn: new Date(Date.now() + 5 * 60 * 1000),
    },
  });
  return verificationCode;
}

// send verification email
async function registerCodeSendEmail(name, email, userId, domain) {
  const verificationCode = Math.floor(100000 + Math.random() * 900000);

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
      intro: `Welcome to ${domain}, powered by My Brand Life! We're excited to have you join the community. To complete your signup, please enter the verification code below.`,
      signature: SINGNATURE_RESPONSE,
      outro: `
      <p style="font-size: 16px; color: #777;"> Your Verification Code: <span style="font-size: 18px; font-weight: 500; color: #2a2a2aff;">${verificationCode}</span>, If you didn't create this account, you can safely ignore this email. Need help? Our team is here for you. support@mybrandlife.me Cheers.</p>
      <p style="font-size: 16px; color: #4285F4;"><a href="${corsUrl}">${NAME_RESPONSE}</a></p>
      <p style="font-size: 16px; color: #4285F4;">E-mail: ${supportMail}</p>`,
    },
  };
  const emailBody = mailGenerator.generate(emailTemplate);
  const mailOptions = {
    from: USER,
    to: email,
    subject: EMAIL_VERIFICATION_CODE_RESPONSE,
    html: emailBody,
  };
  await transporter.sendMail(mailOptions);
  await Prisma.otpModel.create({
    data: {
      code: verificationCode,
      email: email,
      userId: userId,
      expireIn: new Date(Date.now() + 5 * 60 * 1000),
    },
  });
  return verificationCode;
}

// send notification email
async function deactivateEmailSend(landername, email) {
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
      name: `${landername}`,
      intro: "You have recive a notification from MY BRAND LIFE",
      signature: SINGNATURE_RESPONSE,
      outro: `
        <p style="font-size: 20px; color: #777;">Account is deactivated!</p>
        <p style="font-size: 14px; color: #777;">We're sorry, but your account has been deactivated. Please contact support if you believe this is a mistake or would like to reactivate your account.</p>
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
  getAllUser,
  getOneUser,
  registerUser,
  loginUser,
  sendResetCode,
  resetUser,
  updateUser,
  deleteUser,
  verifyUser,
  userLogged,
  logoutUser,
  updatePassword,
  registerAdmin,
  getAllUserByAdmin,
  loginAdmin,
  verifyUserByAdmin,
  togglrUserActivation,
  updateUserByAdmin,
  updateUserPasswordByAdmin,
  updateUserMembership,
};
