const express = require("express");
const auth = require("../middleware/auth");
const {
  getAllDomain,
  getOneDomain,
  deleteDomain,
} = require("../controller/domain.controller");
const router = express.Router();

router.get("/", auth, getAllDomain);
router.get("/:id", auth, getOneDomain);
router.delete("/:id", auth, deleteDomain);

module.exports = router;
