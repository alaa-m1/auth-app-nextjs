import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import { createResetToken } from "@/utils/authTokens";
import sendCustomEmail from "@/utils/sendCustomEmail";
import { resetEmailTemplate } from "@/emailTemplates/resetTemplate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "The entered e-mail does not exist" });
    }
    const user_id = createResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.BASE_URL}/auth/resetpassword/${user_id}`;
    await sendCustomEmail(
      email,
      user.name,
      "",
      url,
      "Reset your password",
      resetEmailTemplate
    );
    res.json({
      message: "The reset message has already been sent to your email...",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
