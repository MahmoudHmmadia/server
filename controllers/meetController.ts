import { Request, Response } from "express";
import { db } from "../lib/db";

export async function newMeet(req: Request, res: Response) {
  try {
    const { id, meetCode } = req.body;
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        role: "ADMIN",
      },
    });
    const newMeet = await db.meet.create({
      data: {
        members: {
          connect: user,
        },
        code: meetCode,
      },
    });
    res.status(200).json({ role: user?.role, meetId: newMeet.id, meetCode });
  } catch (err) {
    console.log("SERVER NOT WORKING WRITE NOW: \n" + err);
    res.status(500).json("SERVER NOT WORKING WRITE NOW");
  }
}
export async function joinMeet(req: Request, res: Response) {
  try {
    const { userId, meetCode } = req.body;
    const user = await db.user.update({
      where: { id: userId },
      data: {
        role: "GUEST",
      },
    });
    const updatedMeet = await db.meet.update({
      where: {
        code: meetCode,
      },
      data: {
        members: {
          connect: user,
        },
      },
    });

    res.status(200).json({ role: user.role, meetId: updatedMeet });
  } catch (err) {
    console.log("SERVER NOT WORKING WRITE NOW: \n" + err);
    res.status(500).json("SERVER NOT WORKING WRITE NOW");
  }
}
export async function setTheAdmin(req: Request, res: Response) {
  try {
    const { meetCode } = req.params;
    const admin = await db.user.findFirstOrThrow({
      where: {
        Meet: {
          is: {
            code: meetCode,
          },
        },
        AND: {
          role: "ADMIN",
        },
      },
    });
    if (admin) {
      return res.status(200).json({ admin: admin.name });
    }
    res.status(500);
  } catch (err) {
    console.log("SERVER NOT WORKING WRITE NOW: \n" + err);
    res.status(500).json("SERVER NOT WORKING WRITE NOW");
  }
}
