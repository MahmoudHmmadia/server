import { Request, Response } from "express";
import { db } from "../lib/db";

export async function chosePlan(req: Request, res: Response) {
  try {
    const { plan, id } = req.body;
    const user = await db.user.findFirst({ where: { id } });
    if (user) {
      user.plan = plan;
      return res.json({ plan });
    }
  } catch (err) {
    console.log("SERVER NOT WORKING WRITE NOW: \n" + err);
    res.status(500).json("SERVER NOT WORKING WRITE NOW");
  }
}
export async function getUsers(req: Request, res: Response) {
  try {
  } catch (err) {
    console.log("SERVER NOT WORKING WRITE NOW: \n" + err);
    res.status(500).json("SERVER NOT WORKING WRITE NOW");
  }
}
