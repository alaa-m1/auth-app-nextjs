import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcryptjs";
import { createActivationToken } from "@/utils/authTokens";
import sendConfirmationEmail from "@/utils/sendConfirmationEmail";
import { activationEmailTemplate } from "@/emailTemplates/activate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
    const { firstName, lastName, address, email, mobile, password } = req.body;
    if (!firstName || !lastName || !address || !email || !mobile || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all the required fields" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }
    if (!validator.isMobilePhone(mobile)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid mobile number" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "This email is already used" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password length must be at least 8 characters" });
    }
    if (password.length > 60) {
      return res
        .status(400)
        .json({ message: "Password length must be less than 60 characters" });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name: `${firstName} ${lastName}`,
      email,
      mobile,
      address,
      password: cryptedPassword,
    });
    await newUser.save();
    const activation_token = createActivationToken({
      id: newUser._id.toString(),
    });
    const url = `${process.env.NEXTAUTH_URL}/activate/${activation_token}`;
    await sendConfirmationEmail(
      newUser.email,
      newUser.name,
      "",
      url,
      "Activate your account",
      activationEmailTemplate
    );
    res.json({
      message:
        "Sign up success. Please check your email for the activation message.",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
