import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
type UserToken = {
  id: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { RESET_PASSWORD_TOKEN_SECRET } = process.env;
  try {
    await connectDb();
    const { token, password } = req.body;
    const userToken = jwt.verify(
      token,
      RESET_PASSWORD_TOKEN_SECRET!
    ) as UserToken;

    const user = await User.findById(userToken.id);
    if (!user) {
      return res.status(400).json({ message: "This account does not exist" });
    }
    const newCryptedPassword = await bcrypt.hash(password, 12);
    await User.findByIdAndUpdate(user.id, { password: newCryptedPassword });

    res.json({ message: "Your password has been changed successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
