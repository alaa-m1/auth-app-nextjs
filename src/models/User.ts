import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 60,
  },
  mobile: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "../../public/images/user-icon.png",
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
  },
});

const User=mongoose.models.User || mongoose.model("User",UserSchema)

export default User;
