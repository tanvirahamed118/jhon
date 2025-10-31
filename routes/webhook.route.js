const express = require("express");
const {
  membershipWebhook,
  echoWebhook,
  renewalWebhook,
} = require("../controller/webhook.controller");
const router = express.Router();

router.post("/", express.raw({ type: "application/json" }), membershipWebhook);
router.post(
  "/renewal",
  express.raw({ type: "application/json" }),
  renewalWebhook
);
router.post("/echo", express.raw({ type: "application/json" }), echoWebhook);

module.exports = router;
