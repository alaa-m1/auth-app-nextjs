import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

type UserToken = {
  id: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ACTIVATION_ACCOUNT_TOKEN_SECRET } = process.env;
  try {
    await connectDb();
    const { token } = req.body;
    const userToken = jwt.verify(
      token,
      ACTIVATION_ACCOUNT_TOKEN_SECRET!
    ) as UserToken;

    const user = await User.findById(userToken.id);
    if (user.accountActivated == true) {
      return res
        .status(400)
        .json({ message: "Your account has already been verified" });
    }
    await User.findByIdAndUpdate(user.id, { accountActivated: true });

    res.json({ message: "Your account has been verified successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
