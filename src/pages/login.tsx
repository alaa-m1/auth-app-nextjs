import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box ml={1}>
        login page 
        <br/>
        <Button variant="contained" color="primary" onClick={() => signIn()}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
