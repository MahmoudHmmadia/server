import express from "express";

const router = express.Router();

router.get("^/$|/index(.html)?", (_req, res) => {
  res.sendFile("views/home.html", { root: "." });
});
export default router;
