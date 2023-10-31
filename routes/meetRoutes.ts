import express from "express";
import { setTheAdmin, joinMeet, newMeet } from "../controllers/meetController";
import checkMeet from "../middleware/checkMeet";
const router = express.Router();
router.post("/", newMeet);
router.patch("/", checkMeet, joinMeet);
router.get("/:meetCode", setTheAdmin);
export default router;
