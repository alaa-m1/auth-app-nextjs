import { Box, Button, Typography, Divider } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import SignUp from "./SignUp";

const Auth = () => {
  const [showSignup, setShowSignup] = useState(true);
  const { data: session } = useSession();
  return (
    <Box
      sx={{
        margin: "40px auto auto",
        maxWidth: "600px",
        boxShadow: "5px 5px 10px #ccc",
        ":hover": { boxShadow: "10px 10px 20px #ccc" },
        textAlign: "center",
      }}
    >
      {showSignup ? (
        <SignUp />
      ) : (
        <Button
          variant="text"
          color="primary"
          sx={{ fontSize: "20px", margin: "5px" }}
          onClick={() => setShowSignup(true)}
        >
          SIGN UP NOW
        </Button>
      )}

      <Divider
        variant="fullWidth"
        orientation="horizontal"
        sx={{ margin: "20px 5px" }}
      />
      <Typography variant="h6" color="initial">
        If you already have an account
      </Typography>
      <Button variant="text" color="primary" onClick={() => signIn()}>
        SIGN IN
      </Button>
    </Box>
  );
};

export default Auth;
