import { Box, Button, Typography } from "@mui/material";
import TextField from "../components";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LockIcon from '@mui/icons-material/Lock';

import { ChangeEvent, useState } from "react";
const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  console.log("userInfo=", userInfo);
  const handleChnage = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  return (
    <Box>
        <Typography variant="h4" color="primary">Sign Up</Typography>
      <form action="">
        <TextField
          value={userInfo.firstName}
          name="firstName"
          label="First Name"
          placeholder="First name"
          icon={<PersonIcon />}
          onChange={handleChnage}
        ></TextField>
        <TextField
          value={userInfo.lastName}
          name="lastName"
          label="Last Name"
          placeholder="Last name"
          icon={<PersonIcon />}
          onChange={handleChnage}
        ></TextField>
        <TextField
          value={userInfo.address}
          name="address"
          label="Address"
          placeholder="Address"
          icon={<BusinessIcon />}
          onChange={handleChnage}
        ></TextField>
        <TextField
          value={userInfo.email}
          name="email"
          label="Email"
          placeholder="Email"
          icon={<EmailIcon />}
          onChange={handleChnage}
        ></TextField>
        <TextField
          value={userInfo.mobile}
          name="mobile"
          label="Mobile number"
          placeholder="Mobile number"
          icon={<SmartphoneIcon />}
          onChange={handleChnage}
        ></TextField>
        <TextField
          value={userInfo.password}
          name="password"
          label="Password"
          placeholder=""
          icon={<LockIcon />}
          type="password"
          onChange={handleChnage}
        ></TextField>
        <TextField
          value={userInfo.confirmPassword}
          name="confirmPassword"
          label="Confirm Password"
          placeholder=""
          icon={<LockIcon />}
          type="password"
          onChange={handleChnage}
        ></TextField>

        <Button variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;
