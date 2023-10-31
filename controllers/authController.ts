import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../lib/db";
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return res.sendStatus(401); // UNAUTHORIZED
    const match = await bcrypt.compare(password, user.password!);
    if (!match) return res.sendStatus(401); // UNAUTHORIZED
    const token = jwt.sign({ email }, process.env.ACCESS_SECRET!, {
      expiresIn: "1m",
    });
    const refresh = jwt.sign({ email }, process.env.REFRESH_SECRET!, {
      expiresIn: "1d",
    });
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        refresh,
      },
    });
    res.status(200).json({ token, userDetails: user });
  } catch (err) {
    console.log("SERVER NOT WORKING WRITE NOW: \n" + err);
    res.status(500).json("SERVER NOT WORKING WRITE NOW");
  }
}
export async function register(req: Request, res: Response) {
  try {
    const { data, imageName } = req.body;
    const { name, password, email } = JSON.parse(data);
    const exist = await db.user.findUnique({ where: { email } });
    if (exist) return res.sendStatus(409); // CONFLICT
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, process.env.ACCESS_SECRET!, {
      expiresIn: "1d",
    });
    const newUser = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        imageName,
        age: "",
        callsNumber: 0,
        refresh: "",
      },
    });
    res.status(200).json({ token, userDetails: newUser });
  } catch (err) {
    console.log("SERVER NOT WORKING WRITE NOW: \n" + err);
    res.status(500).json("SERVER NOT WORKING WRITE NOW");
  }
}
