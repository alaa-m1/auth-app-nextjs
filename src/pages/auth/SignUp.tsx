import { Box, Button, Typography } from "@mui/material";
import TextField from "../components";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LockIcon from "@mui/icons-material/Lock";

import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";

const UserSchema = z
  .object({
    firstName: z
      .string()
      .min(5, "The first name must be at least 5 characters")
      .max(32, "The first name must be less than 32 characters")
      .regex(
        new RegExp("^[a-zA-Z]+$"),
        "The first name must not contains any special characters"
      ),
    lastName: z
      .string()
      .min(5, "The last name must be at least 5 characters")
      .max(32, "The last name must be less than 32 characters")
      .regex(
        new RegExp("^[a-zA-Z]+$"),
        "The last name must not contains any special characters"
      ),
    address: z
      .string()
      .min(8, "The address must be at least 8 characters")
      .max(100, "The address must be less than 100 characters"),
    email: z.string().email("You must enter a valid Email"),
    mobile: z.string().refine(validator.isMobilePhone, {
      message: "Please enter a valid phone number",
    }),
    password: z
      .string()
      .min(8, "The password must be at least 8 characters")
      .max(60, "The password must be less than 60 characters"),
    confirmPassword: z.string(),
  })
  .refine((formData) => formData.password === formData.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type UserSchemaType = z.infer<typeof UserSchema>;

const SignUp = () => {
  // const [userInfo, setUserInfo] = useState({
  //   firstName: "",
  //   lastName: "",
  //   address: "",
  //   email: "",
  //   mobile: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UserSchemaType>({ resolver: zodResolver(UserSchema) });
  const onSubmit = (data: any) => console.log(data);

  // console.log("userInfo=", userInfo);
  // const handleChnage = (e: ChangeEvent<HTMLInputElement>) => {
  //   setUserInfo((p) => ({ ...p, [e.target.name]: e.target.value }));
  // };
  return (
    <Box>
      <Typography variant="h4" color="primary">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="firstName"
          label="First Name"
          placeholder="First name"
          icon={<PersonIcon />}
          register={register}
          errors={errors.firstName?.message}
          disabled={isSubmitting}
        ></TextField>
        <TextField
          name="lastName"
          label="Last Name"
          placeholder="Last name"
          icon={<PersonIcon />}
          register={register}
          errors={errors.lastName?.message}
          disabled={isSubmitting}
        ></TextField>
        <TextField
          name="address"
          label="Address"
          placeholder="Address"
          icon={<BusinessIcon />}
          register={register}
          errors={errors.address?.message}
          disabled={isSubmitting}
        ></TextField>
        <TextField
          name="email"
          label="Email"
          placeholder="Email"
          icon={<EmailIcon />}
          register={register}
          errors={errors.email?.message}
          disabled={isSubmitting}
        ></TextField>
        <TextField
          name="mobile"
          label="Mobile number"
          placeholder="Mobile number"
          icon={<SmartphoneIcon />}
          register={register}
          errors={errors.mobile?.message}
          disabled={isSubmitting}
        ></TextField>
        <TextField
          name="password"
          label="Password"
          placeholder=""
          icon={<LockIcon />}
          type="password"
          register={register}
          errors={errors.password?.message}
          disabled={isSubmitting}
        ></TextField>
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          placeholder=""
          icon={<LockIcon />}
          type="password"
          register={register}
          errors={errors.confirmPassword?.message}
          disabled={isSubmitting}
        ></TextField>

        <Button variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;
