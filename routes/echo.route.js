const express = require("express");
const auth = require("../middleware/auth");
const {
  createEcho,
  getAllEcho,
  getOneEcho,
  updateEcho,
  deleteEcho,
  connectStripeAccount,
  toggleEcho,
  updateEchoStatus,
  getAllEchoByLander,
  checkStripeConnection,
} = require("../controller/echo.controller");
const router = express.Router();

router.get("/", auth, getAllEcho);
router.get("/lander", auth, getAllEchoByLander);
router.get("/:id", auth, getOneEcho);
router.get("/stripe/connection/:id", auth, checkStripeConnection);
router.post("/", auth, createEcho);
router.post("/stripe/connect", auth, connectStripeAccount);
router.patch("/status/:id", auth, updateEchoStatus);
router.patch("/toggle/:id", auth, toggleEcho);
router.patch("/:id", auth, updateEcho);
router.delete("/:id", auth, deleteEcho);

module.exports = router;
