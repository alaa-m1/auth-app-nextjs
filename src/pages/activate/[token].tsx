import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { NextPageContext } from "next";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

const Activate = ({ token }: { token: string }) => {
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success" | "";
  }>({ text: "", type: "" });

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const { data } = await axios.put("/api/auth/activate", { token });
        setMessage({ text: data.message, type: "success" });
      } catch (error: any) {
        setMessage({ text: error.response.data.message, type: "success" });
      }
    };
    activateAccount();
  }, [token]);

  return (
    <>
      {message.type && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "500px",
            margin: "50px auto",
            border: "1px solid #ccc",
            boxShadow: "5px 5px 10px #ccc",
          }}
        >
          {message.type === "error" && (
            <>
              <Typography variant="h6" color="success">
                {message.text}
              </Typography>
              <Button variant="text" color="primary" onClick={() => signIn()}>
                SIGN IN
              </Button>
            </>
          )}
          {message.type === "success" && (
            <>
              <Typography variant="h6" color="success">
                {message.text}
              </Typography>
              <Button variant="text" color="primary" onClick={() => signIn()}>
                SIGN IN
              </Button>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  const token = query.token;
  return {
    props: { token },
  };
}

export default Activate;
