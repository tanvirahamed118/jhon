const express = require("express");
const auth = require("../middleware/auth");
const {
  createEvent,
  goolgeAuth,
  googleAuthCallback,
  createSlot,
  getAllEvent,
  getAllSlot,
  deleteSlot,
  toggleEvent,
  getOneEvent,
  deleteEvent,
  updateEventStatus,
  getAllSlotByLander,
  updateEvent,
} = require("../controller/event.controller");
const router = express.Router();

router.get("/", auth, getAllEvent);
router.get("/slot", auth, getAllSlot);
router.get("/slot/lander", getAllSlotByLander);
router.get("/google", goolgeAuth);
router.get("/google/callback", auth, googleAuthCallback);
router.get("/:id", auth, getOneEvent);
router.post("/", auth, createEvent);
router.post("/slot", auth, createSlot);
router.patch("/:id", auth, updateEvent);
router.patch("/toggle/:id", auth, toggleEvent);
router.patch("/status/:id", auth, updateEventStatus);
router.delete("/slot/:id", auth, deleteSlot);
router.delete("/:id", auth, deleteEvent);

module.exports = router;
