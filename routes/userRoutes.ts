import express from "express";
import { chosePlan } from "../controllers/userController";
const router = express.Router();
router.get("/");
router.post("/plan", chosePlan);
export default router;
