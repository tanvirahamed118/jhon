const { google } = require("googleapis");
const { ERROR_STATUS, SUCCESS_STATUS } = require("../utils/status");
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
const Prisma = require("../config/db.config");
const {
  FORM_SUBMITION_SUCCESSFUL_MESSAGE,
  DATA_NOT_FOUND_MESSAGE,
  QUERY_SUCCESSFUL_MESSAGE,
  DELETE_SUCCESS_MESSAGE,
  UPDATE_SUCCESSFUL_MESSAGE,
  NAME_RESPONSE,
  SINGNATURE_RESPONSE,
  OUTRO_RESPONSE,
  BOOKING_SUBMIT_SUCCESSFUL,
} = require("../utils/response");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const corsUrl = process.env.CORS_URL;
const supportMail = process.env.SUPPORT_MAIL;
const USER = process.env.EMAIL_USER;
const PASSWORD = process.env.EMAIL_PASSWORD;
const SERVER_KEY = process.env.EMAIL_SERVER_KEY;
const SERVER_PORT = process.env.EMAIL_SERVER_PORT;

// get all event
async function getAllEvent(req, res) {
  const {
    page = 1,
    limit = 10,
    searchBy = "",
    statusBy = "",
    userId,
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
    const event = await Prisma.event.findMany({
      skip: skip,
      take: limitNumber,
      where: filter,
      include: {
        user: true,
      },
    });
    const totalEvent = await Prisma.event.count({ where: filter });
    const totalPage = Math.ceil(totalEvent / limitNumber);
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: QUERY_SUCCESSFUL_MESSAGE,
      data: {
        event,
        totalPage,
        totalEvent,
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

// get all slot
async function getAllSlot(req, res) {
  const { page = 1, limit = 10, userId } = req.query;
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const skip = (pageNumber - 1) * limitNumber;

  try {
    const slot = await Prisma.slot.findMany({
      skip: skip,
      take: limitNumber,
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });
    const totalSlot = await Prisma.slot.count({ where: { userId: userId } });
    const totalPage = Math.ceil(totalSlot / limitNumber);
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: QUERY_SUCCESSFUL_MESSAGE,
      data: {
        slot,
        totalPage,
        totalSlot,
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

// get all slot by ander
async function getAllSlotByLander(req, res) {
  const { userId } = req.query;
  try {
    const slot = await Prisma.slot.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: QUERY_SUCCESSFUL_MESSAGE,
      slot: slot,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// get one event
async function getOneEvent(req, res) {
  const { id } = req.params;
  try {
    const existEvent = await Prisma.event.findUnique({
      where: {
        id: id,
      },
    });
    if (!existEvent) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: DELETE_SUCCESS_MESSAGE,
      event: existEvent,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// create event
async function createEvent(req, res) {
  const { name, email, date, time, userId, note } = req.body;
  try {
    const integration = await Prisma.user.findUnique({
      where: { id: userId },
      select: { calendarId: true, accessToken: true, refreshToken: true },
    });
    await Prisma.event.create({
      data: {
        name,
        email,
        date,
        time,
        note,
        userId,
        status: "PENDING",
      },
    });

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      access_token: integration.accessToken,
      refresh_token: integration.refreshToken,
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const startDateTime = new Date(date);
    const { hours, minutes } = parseTimeString(time);
    startDateTime.setHours(hours, minutes, 0);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);
    calendar.events.insert({
      calendarId: integration.calendarId,
      requestBody: {
        summary: name,
        description: note || `Booking from ${email}`,
        start: { dateTime: startDateTime.toISOString() },
        end: { dateTime: endDateTime.toISOString() },
        attendees: [{ email }],
      },
    });

    function parseTimeString(timeStr) {
      const [timePart, modifier] = timeStr.split(" ");
      let [hours, minutes] = timePart.split(":").map(Number);
      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
      return { hours, minutes };
    }
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: BOOKING_SUBMIT_SUCCESSFUL,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// create slot
async function createSlot(req, res) {
  const { date, times, userId } = req.body;
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
    await Prisma.slot.create({
      data: {
        date: new Date(date),
        times: times,
        userId: userId,
      },
    });
    res.status(201).json({
      status: SUCCESS_STATUS,
      message: FORM_SUBMITION_SUCCESSFUL_MESSAGE,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// google auth
async function goolgeAuth(req, res) {
  try {
    const scopes = [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ];
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: scopes,
    });
    res.redirect(url);
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// google auth callback
async function googleAuthCallback(req, res) {
  const code = req.query.code;
  const userId = req.userId;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const user = await Prisma.user.findUnique({ where: { id: userId } });
    const calendarSummary = `${user.name || "Brand"} - MyBrandLife Calendar`;
    const calendarList = await calendar.calendarList.list();
    let existingCalendar = calendarList.data.items.find((cal) =>
      cal.summary?.includes("MyBrandLife")
    );
    let calendarId;
    if (existingCalendar) {
      calendarId = existingCalendar.id;
    } else {
      const newCalendar = await calendar.calendars.insert({
        requestBody: { summary: calendarSummary },
      });
      calendarId = newCalendar.data.id;
    }
    await Prisma.user.update({
      where: { id: userId },
      data: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        calendarId,
      },
    });
    res.redirect(`${process.env.CORS_URL}/google/connect/success`);
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// update status event
async function toggleEvent(req, res) {
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
        enableEvent: status,
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

// delete slot
async function deleteSlot(req, res) {
  const { id } = req.params;
  try {
    const existSlot = await Prisma.slot.findUnique({
      where: {
        id: id,
      },
    });
    if (!existSlot) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    await Prisma.slot.delete({
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

// update event status
async function updateEventStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const existEvent = await Prisma.event.findUnique({
      where: {
        id: id,
      },
    });
    if (!existEvent) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }

    await Prisma.event.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
    const { email, name } = existEvent || {};
    if (status === "CONFIRMED") {
      await sendNotificationEmail(
        name,
        email,
        "We're pleased to inform you that your booking has been confirmed. You'll receive further updates shortly.",
        "Booking Confirmed"
      );
    }

    if (status === "REJECTED") {
      await sendNotificationEmail(
        name,
        email,
        "We're sorry to inform you that your booking could not be confirmed at this time. Please feel free to try again or contact our support team for assistance.",
        "Booking Not Confirmed"
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

// update event
async function updateEvent(req, res) {
  const { name, email, date, time, note, status } = req.body;
  const id = req.params.id;
  try {
    const existEcho = await Prisma.event.findUnique({
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
    await Prisma.event.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
        date: new Date(date),
        time: addAmPm(time),
        note,
        status,
      },
    });

    function addAmPm(timeString) {
      if (!timeString) return "";

      const [hourStr, minute] = timeString.split(":");
      let hour = parseInt(hourStr, 10);

      const meridian = hour >= 12 ? "PM" : "AM";
      if (hour > 12) hour -= 12;
      if (hour === 0) hour = 12;

      return `${hour}:${minute} ${meridian}`;
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

// delete event
async function deleteEvent(req, res) {
  const { id } = req.params;
  try {
    const existEvent = await Prisma.event.findUnique({
      where: {
        id: id,
      },
    });
    if (!existEvent) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    await Prisma.event.delete({
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
  getAllEvent,
  goolgeAuth,
  googleAuthCallback,
  createEvent,
  createSlot,
  getAllSlot,
  deleteSlot,
  toggleEvent,
  getOneEvent,
  deleteEvent,
  updateEventStatus,
  getAllSlotByLander,
  updateEvent,
};
