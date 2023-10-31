import { NextFunction, Request, Response } from "express";
import { db } from "../lib/db";

export default async function checkMeet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { meetCode } = req.body;
    const meet = await db.meet.findUnique({
      where: {
        code: meetCode,
      },
    });
    if (meet) {
      next();
    } else {
      return res.status(400).json({
        message: "THERE IS NO MEET WITH THIS CODE!, PLEASE WRITE A VALID CODE",
      });
    }
  } catch (err) {
    console.log("SERVER NOT WORKING WRITE NOW: \n" + err);
    res.status(500).json("SERVER NOT WORKING WRITE NOW");
  }
}
