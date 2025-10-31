const Prisma = require("../config/db.config");
const {
  DATA_NOT_FOUND_MESSAGE,
  QUERY_SUCCESSFUL_MESSAGE,
  DELETE_SUCCESS_MESSAGE,
} = require("../utils/response");
const { ERROR_STATUS, SUCCESS_STATUS } = require("../utils/status");

// get all domain
async function getAllDomain(req, res) {
  const { page = 1, limit = 10, searchBy = "" } = req.query;
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const skip = (pageNumber - 1) * limitNumber;
  let filter = {};
  if (searchBy) {
    filter.domain = {
      contains: searchBy,
      mode: "insensitive",
    };
  }
  try {
    const domain = await Prisma.domainReq.findMany({
      skip: skip,
      take: limitNumber,
      where: filter,
    });
    const totalDomain = await Prisma.domainReq.count({ where: filter });
    const totalPage = Math.ceil(totalDomain / limitNumber);
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: QUERY_SUCCESSFUL_MESSAGE,
      data: {
        domain,
        totalPage,
        totalDomain,
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

// get one domain
async function getOneDomain(req, res) {
  const id = req.params.id;
  try {
    const existDomain = await Prisma.domainReq.findUnique({
      where: {
        id: id,
      },
    });
    if (!existDomain) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    res.status(200).json({
      status: SUCCESS_STATUS,
      message: QUERY_SUCCESSFUL_MESSAGE,
      domain: existDomain,
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR_STATUS,
      message: error.message,
    });
  }
}

// update domain
async function deleteDomain(req, res) {
  const id = req.params.id;
  try {
    const existDomain = await Prisma.domainReq.findUnique({
      where: {
        id: id,
      },
    });
    if (!existDomain) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: DATA_NOT_FOUND_MESSAGE,
      });
    }
    await Prisma.domainReq.delete({
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

module.exports = {
  getAllDomain,
  getOneDomain,
  deleteDomain,
};
