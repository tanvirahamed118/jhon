const Prisma = require("../config/db.config");
const { createPayment } = require("../middleware/payment.creators");
const {
  centerPositionDomains,
  leftPositionDomains,
  rightPositionDomains,
  redDomains,
  lightBlueDomains,
  blueDomains,
  limeDomains,
  mangoDomains,
  orangeDomains,
} = require("../utils/domains");
const {
  INCORRECT_REFERRAL_CODE_MESSAGE,
  VALID_REFERRAL_CODE_MESSAGE,
  DATA_NOT_FOUND_MESSAGE,
  ONBOARDING_SUCCESSFUL_MESSAGE,
  UPDATE_SUCCESSFUL_MESSAGE,
  DELETE_SUCCESS_MESSAGE,
  REQUEST_SUBMIT_SUCCESSFUL_MESSAGE,
  ONBOARD_ALREADY_CREATED_MESSAGE,
  QUERY_SUCCESSFUL_MESSAGE,
  USER_VERIFY_SUCCESSFUL_MESSAGE,
} = require("../utils/response");
const { ERROR_STATUS, SUCCESS_STATUS } = require("../utils/status");
const fs = require("fs");
const path = require("path");
const VCF = require("vcf");
const card = new VCF();
const freeCodes = [
  process.env.FREE_CODE_ONE,
  process.env.FREE_CODE_TOW,
  process.env.FREE_CODE_THREE,
];

// get all onboard
async function getAllOnboard(req, res) {
  const {
    page = 1,
    limit = 10,
    searchBy = "",
    statusBy = "",
    userId,
  } = req.query;
  const verify = statusBy === "ACTIVE" ? true : false;
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const skip = (pageNumber - 1) * limitNumber;
  let filter = { userId };
  if (searchBy) {
    filter.user = {
      domain: {
        contains: searchBy,
        mode: "insensitive",
      },
    };
  }
  if (statusBy) {
    filter.verify = verify;
  }

  try {
    const onboard = await Prisma.userTemplete.findMany({
      skip: skip,
      take: limitNumber,
      where: filter,
      include: {
        user: true,
      },
    });
    const totalOnboard = await Prisma.userTemplete.count({ where: filter });
    const totalPage = Math.ceil(totalOnboard / limitNumber);
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: QUERY_SUCCESSFUL_MESSAGE,
      data: {
        onboard,
        totalPage,
        totalOnboard,
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

// get all onboard by admin
async function getAllOnboardByAdmin(req, res) {
  const { page = 1, limit = 10, searchBy = "", statusBy = "" } = req.query;
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const skip = (pageNumber - 1) * limitNumber;
  let filter = {};
  if (searchBy) {
    filter.user = {
      landerName: {
        contains: searchBy,
        mode: "insensitive",
      },
    };
  }
  if (statusBy) {
    filter.status = statusBy;
  }

  try {
    const onboard = await Prisma.userTemplete.findMany({
      skip: skip,
      take: limitNumber,
      where: filter,
      include: {
        user: true,
      },
    });
    const totalOnboard = await Prisma.userTemplete.count({ where: filter });
    const totalPage = Math.ceil(totalOnboard / limitNumber);
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: QUERY_SUCCESSFUL_MESSAGE,
      data: {
        onboard,
        totalPage,
        totalOnboard,
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

// get one onboard by lander domain and name
async function getOneOboard(req, res) {
  const { domain } = req.query;

  const name = req.params.name;

  try {
    const eixstUser = await Prisma.user.findUnique({
      where: {
        landerName: name,
        domain: domain,
      },
    });
    if (!eixstUser) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    const existOnoard = await Prisma.userTemplete.findFirst({
      where: {
        userId: eixstUser?.id,
        status: "ACTIVATE",
      },
      include: {
        buttonSet: true,
        services: true,
        user: true,
      },
    });
    if (!existOnoard) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: QUERY_SUCCESSFUL_MESSAGE,
      onboard: existOnoard,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// get one onboard by id
async function getOneOboardById(req, res) {
  const id = req.params.id;
  try {
    const existOnoard = await Prisma.userTemplete.findUnique({
      where: {
        id: id,
      },
      include: {
        templateInfo: true,
        buttonSet: true,
        user: true,
        services: true,
      },
    });
    if (!existOnoard) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: QUERY_SUCCESSFUL_MESSAGE,
      onboard: existOnoard,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// check discount code
async function checkDiscountCode(req, res) {
  const { code } = req.body;
  try {
    const existReferal = await Prisma.referralCustomer.findUnique({
      where: {
        referalCode: code,
      },
    });

    if (freeCodes?.includes(code)) {
      return res.status(200).json({
        status: SUCCESS_STATUS,
        message: VALID_REFERRAL_CODE_MESSAGE,
        referalCode: code,
      });
    } else {
      if (!existReferal) {
        return res.status(404).json({
          status: ERROR_STATUS,
          message: INCORRECT_REFERRAL_CODE_MESSAGE,
        });
      }
    }
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: VALID_REFERRAL_CODE_MESSAGE,
      referalCode: code,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// verify template
async function verifyOnboard(req, res) {
  const id = req.params.id;
  try {
    const existOnboard = await Prisma.userTemplete.findUnique({
      where: {
        id: id,
      },
    });
    if (!existOnboard) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    await Prisma.userTemplete.update({
      where: {
        id: id,
      },
      data: {
        verify: true,
      },
    });
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: USER_VERIFY_SUCCESSFUL_MESSAGE,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// request a domain
async function requestADomain(req, res) {
  const { domain, email } = req.body;
  try {
    const newRequest = await Prisma.domainReq.create({
      data: {
        email: email,
        domain: domain,
      },
    });
    res.status(201).json({
      status: SUCCESS_STATUS,
      message: REQUEST_SUBMIT_SUCCESSFUL_MESSAGE,
      request: newRequest,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// request info
async function requestInfo(req, res) {
  const { note, phone, name, templateId, email, lat, lon, accu } = req.body;
  try {
    const newRequest = await Prisma.templateInfo.create({
      data: {
        email: email,
        note: note,
        phone: phone,
        name: name,
        templateId: templateId,
        lat: lat,
        lon: lon,
        accu: accu,
      },
    });
    res.status(201).json({
      status: SUCCESS_STATUS,
      message: REQUEST_SUBMIT_SUCCESSFUL_MESSAGE,
      request: newRequest,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// request info location
async function requestInfoLocation(req, res) {
  const { id, lat, lon, accu } = req.body;
  try {
    const newRequest = await Prisma.templateInfo.update({
      where: { id: id },
      data: {
        lat: lat,
        lon: lon,
        accu: accu,
      },
    });
    res.status(201).json({
      status: SUCCESS_STATUS,
      message: REQUEST_SUBMIT_SUCCESSFUL_MESSAGE,
      request: newRequest,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// onboarding user
async function onboardingUser(req, res) {
  const {
    referalCode,
    bio,
    tagLine,
    offerings,
    funnySaying,
    services,
    userId,
    vfrCreate,
    merchendiseUrl,
    ...socialLinks
  } = req.body;

  try {
    const existUser = await Prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const existOnboard = await Prisma.userTemplete.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!existUser) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    if (existOnboard) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: ONBOARD_ALREADY_CREATED_MESSAGE,
      });
    }
    const basePath = `${req.protocol}://${req.get("host")}/public/`;

    let medias = {
      portrait: "",
      logo: "",
      banner: "",
      background: "",
      epkFile: "",
    };

    for (const fieldName in req.files) {
      if (medias.hasOwnProperty(fieldName) && req.files[fieldName][0]) {
        medias[fieldName] = `${basePath}${req.files[fieldName][0].filename}`;
      }
    }
    const domain = existUser?.domain || "";
    const cleanDomain = domain.split(".")[0];
    const layoutDetection = centerPositionDomains?.includes(cleanDomain)
      ? "CENTER"
      : leftPositionDomains?.includes(cleanDomain)
      ? "LEFT"
      : rightPositionDomains?.includes(cleanDomain)
      ? "RIGHT"
      : "";
    const colorDetection = redDomains.includes(cleanDomain)
      ? "#ab2d28"
      : lightBlueDomains.includes(cleanDomain)
      ? "#92cee8"
      : blueDomains.includes(cleanDomain)
      ? "#5171bb"
      : limeDomains.includes(cleanDomain)
      ? "#cfe14e"
      : mangoDomains.includes(cleanDomain)
      ? "#ecc246"
      : orangeDomains.includes(cleanDomain)
      ? "#de8839"
      : "#96c94b";
    const newTemplate = await Prisma.userTemplete.create({
      data: {
        bio: bio,
        tagLine: tagLine,
        offerings: offerings,
        funnySaying: funnySaying,
        portrait: medias.portrait,
        logo: medias.logo,
        banner: medias.banner,
        background: medias.background,
        epkFile: medias.epkFile,
        layout: layoutDetection,
        userId: userId,
        headerBgType: "COLOR",
        headerBgType: "COLOR",
        ContentBGType: "COLOR",
        footerBgType: "COLOR",
        merchendiseUrl: merchendiseUrl,
        verify: true,
        officialColor: colorDetection,
        status: "ACTIVATE",
      },
    });

    const allUrls = [
      "FACEBOOK",
      "TWITTER",
      "LINKEDIN",
      "YOUTUBE",
      "CUSTOM",
      "SNAPCHAT",
      "TIKTOK",
      "EMAIL",
      "PHONE",
      "INSTAGRAM",
      "REDDIT",
      "TUMBLR",
      "PINTEREST",
      "WHATSAPP",
      "WECHAT",
      "TELIGRAM",
      "DISCORD",
      "TWITCH",
      "GITHUB",
      "SOUNDCLOUD",
      "VIMEO",
      "SPOTIFY",
      "CLUBHOUSE",
      "PERISCOPE",
      "DRIBBLE",
      "BEHANCE",
      "DAILYMOTION",
      "MIXCLOUD",
      "FLICKR",
      "ANCHOR",
      "PATREON",
      "NEXTDOOR",
    ];
    const buttonData = Object.entries(socialLinks).flatMap(([key, value]) => {
      if (allUrls.includes(key)) {
        return {
          name: key.toUpperCase(),
          url: value,
          templateId: newTemplate.id,
        };
      }
      return [];
    });

    if (vfrCreate === "yes") {
      // create vfc file
      const { midName, email, phone, address, landerName } = existUser;
      card.set("fn", midName);
      card.set("note", offerings);
      card.set("org", landerName || "");
      card.set("title", tagLine || "");
      card.set("email", email || "");
      card.set("tel", phone || "");
      card.set("adr", ["", "", address, "", "", "", ""]);
      const portraitPath = req.files?.logo ? req.files.logo[0].path : null;
      if (portraitPath && fs.existsSync(portraitPath)) {
        const portraitData = fs.readFileSync(portraitPath).toString("base64");
        card.set("photo", portraitData, { encoding: "b", type: "JPEG" });
      }
      if (socialLinks && typeof socialLinks === "object") {
        for (const [key, value] of Object.entries(socialLinks)) {
          if (value) {
            card.set(`x-socialprofile;type=${key.toLowerCase()}`, value);
          }
        }
      }
      const fileDir = path.join(__dirname, "../public");
      if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir, { recursive: true });
      const fileName = `${landerName || "contact"}_${Date.now()}.vcf`;
      const filePath = path.join(fileDir, fileName);
      fs.writeFileSync(filePath, card.toString(), "utf-8");
      await Prisma.userTemplete.update({
        where: { id: newTemplate?.id },
        data: { vcfFile: filePath },
      });
      // create vfc file
    }

    if (buttonData.length > 0) {
      await Prisma.buttonSet.createMany({ data: buttonData });
    }

    if (services?.length > 0) {
      await Promise.all(
        services.map((service) =>
          Prisma.services.create({
            data: {
              title: service,
              templateId: newTemplate.id,
            },
          })
        )
      );
    }

    res.status(200).json({
      status: SUCCESS_STATUS,
      message: ONBOARDING_SUCCESSFUL_MESSAGE,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// recreate payment
async function recreatePayment(req, res) {
  const id = req.params.id;
  try {
    const existUser = await Prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    const existTemplate = await Prisma.userTemplete.findFirst({
      where: {
        userId: id,
      },
    });
    if (!existUser || !existTemplate) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    const resData = await createPayment(existUser);

    res.status(200).json({
      status: SUCCESS_STATUS,
      message: QUERY_SUCCESSFUL_MESSAGE,
      pageUrl: resData.pageUrl,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// update templete social media
async function updateTempleteSocial(req, res) {
  const id = req.params.id;
  const reqData = req.body;
  try {
    const existTemplete = await Prisma.userTemplete.findUnique({
      where: {
        id: id,
      },
    });
    if (!existTemplete) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    await Promise.all(
      reqData?.map((item) =>
        Prisma.buttonSet.update({
          where: { id: item?.id },
          data: {
            name: item.name,
            url: item.url,
          },
        })
      )
    );
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

// Update templete medias
async function updateTempleteMedias(req, res) {
  const id = req.params.id;
  try {
    const existTemplate = await Prisma.userTemplete.findUnique({
      where: { id: id },
    });

    if (!existTemplate) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    const basePath = `${req.protocol}://${req.get("host")}/public/`;
    let medias = {
      portrait: "",
      logo: "",
      banner: "",
      background: "",
      epkFile: "",
    };

    for (const fieldName in req.files) {
      if (medias.hasOwnProperty(fieldName) && req.files[fieldName][0]) {
        medias[fieldName] = `${basePath}${req.files[fieldName][0].filename}`;
      }
    }

    const updateUserTemplete = await Prisma.userTemplete.update({
      where: {
        id: id,
      },
      data: {
        portrait: medias.portrait ? medias.portrait : existTemplate?.portrait,
        logo: medias.logo ? medias.logo : existTemplate?.logo,
        banner: medias.banner ? medias.banner : existTemplate?.banner,
        background: medias.background
          ? medias.background
          : existTemplate?.background,
        epkFile: medias.epkFile ? medias.epkFile : existTemplate?.epkFile,
      },
    });

    res.status(200).json({
      status: SUCCESS_STATUS,
      message: UPDATE_SUCCESSFUL_MESSAGE,
      userTemplete: updateUserTemplete,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// update templete infos
async function updateTempleteInfos(req, res) {
  const id = req.params.id;
  const {
    midName,
    nickName,
    cardNumber,
    bio,
    tagLine,
    businessServiced = [],
    offerings,
    funnySaying,
  } = req.body;
  try {
    const existTemplete = await Prisma.userTemplete.findUnique({
      where: { id },
      include: { services: true },
    });
    if (!existTemplete) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    await Prisma.user.update({
      where: { id: existTemplete.userId },
      data: {
        midName,
        nickName,
        cardNumber,
      },
    });
    const existingServices = existTemplete.services;
    const newServiceIds = businessServiced.filter((s) => s.id).map((s) => s.id);
    const deletedServices = existingServices.filter(
      (service) => !newServiceIds.includes(service.id)
    );
    if (deletedServices.length > 0) {
      await Prisma.services.deleteMany({
        where: {
          id: { in: deletedServices.map((s) => s.id) },
        },
      });
    }
    for (const service of businessServiced) {
      if (service.id) {
        await Prisma.services.update({
          where: { id: service.id },
          data: { title: service.title },
        });
      } else {
        await Prisma.services.create({
          data: {
            title: service.title,
            templateId: id,
          },
        });
      }
    }
    await Prisma.userTemplete.update({
      where: { id },
      data: {
        bio,
        tagLine,
        offerings,
        funnySaying,
      },
      include: { services: true, user: true },
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

// update membership
async function updateMemebership(req, res) {
  const {
    domain,
    packageType,
    planKey,
    planPrice,
    planOldPrice,
    frequency,
    templateId,
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
    await Prisma.user.update({
      where: {
        id: id,
      },
      data: {
        domain: `${domain}.me`,
        frequency: frequency,
        planKey: planKey,
        planPrice: Number(planPrice),
        planOldPrice: Number(planOldPrice),
        package: packageType,
      },
    });
    await Prisma.userTemplete.update({
      where: {
        id: templateId,
      },
      data: {
        verify: false,
      },
    });
    const putData = {
      planKey,
      planPrice,
      planOldPrice,
      frequency,
      planId: existUser?.planId,
      domain: `${domain}.me`,
      id: id,
    };
    const resData = await createPayment(putData);
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: UPDATE_SUCCESSFUL_MESSAGE,
      pageUrl: resData.pageUrl,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// delete user templete
async function deleteTemplete(req, res) {
  const id = req.params.id;
  try {
    const existTemplete = await Prisma.userTemplete.findUnique({
      where: {
        id: id,
      },
    });
    if (!existTemplete) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    await Prisma.userTemplete.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: DELETE_SUCCESS_MESSAGE,
      templete: existTemplete,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

module.exports = {
  onboardingUser,
  updateTempleteSocial,
  updateTempleteMedias,
  updateTempleteInfos,
  deleteTemplete,
  checkDiscountCode,
  requestADomain,
  getAllOnboard,
  getOneOboard,
  recreatePayment,
  getOneOboardById,
  updateMemebership,
  getAllOnboardByAdmin,
  verifyOnboard,
  requestInfo,
  requestInfoLocation,
};
