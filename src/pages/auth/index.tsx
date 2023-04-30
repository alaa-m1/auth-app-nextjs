import {
  Box,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { getCsrfToken, getProviders, useSession } from "next-auth/react";
import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { NextPageContext } from "next";
import { Provider } from "./types";
import { ColoredDevider, LinkButton, SocialButton } from "../components";
import { useRouter } from "next/router";
import ForgetPassword from "./ForgetPassword";

const Auth = ({
  p,
  callbackUrl,
  csrfToken,
  providers,
}: {
  p: string;
  callbackUrl: string;
  csrfToken: string;
  providers: Array<Provider>;
}) => {
  const [showSignup, setShowSignup] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = router.pathname;
  const theme = useTheme();
  return (
    <Box
      sx={{
        margin: "40px auto auto",
        maxWidth: "600px",
        boxShadow: "5px 5px 10px #ccc",
        ":hover": { boxShadow: "10px 10px 20px #ccc" },
        textAlign: "center",
        paddingBottom: "10px",
      }}
    >
      <Box>
        {p === "signup" ? (
          <SignUp />
        ) : p === "forgetpassword" ? (
          <ForgetPassword />
        ) : (
          <SignIn callbackUrl={callbackUrl} csrfToken={csrfToken} />
        )}
      </Box>
      {p !== "forgetpassword" && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "0px 10px",
              marginBottom: "10px",
            }}
          >
            <Box
              sx={{
                width: "30%",
                backgroundColor: "#ccc",
                height: "2px",
                margin: "7px 5px",
              }}
            />
            <Box component="span" sx={{ width: "30%",color: "#ccc", fontWeight:'bold' }}>
              Or continue with
            </Box>
            <Box
              sx={{
                width: "30%",
                backgroundColor: "#ccc",
                height: "2px",
                margin: "7px 5px",
              }}
            />
          </Box>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            columnSpacing={2}
            rowSpacing={0.5}
          >
            {(providers || []).map((provider, index) => {
              if (provider.id !== "credentials")
                return (
                  <SocialButton
                    key={provider.id}
                    provider={provider}
                    page={p}
                    csrfToken={csrfToken}
                    index={index}
                  ></SocialButton>
                );
              else return;
            })}
          </Grid>
        </>
      )}
      <ColoredDevider/>
      {p === "signup" || p === "forgetpassword" ? (
        <Box sx={{ "button:hover": { backgroundColor: "transparent" } }}>
          <Typography
            variant="caption"
            color={theme.palette.text.secondary}
            fontSize={18}
          >
            If you already have an account &nbsp;
          </Typography>
          <LinkButton label="SIGN In" />
        </Box>
      ) : (
        <Box sx={{ "button:hover": { backgroundColor: "transparent" } }}>
          <Typography
            variant="caption"
            color={theme.palette.text.secondary}
            fontSize={18}
          >
            If you do not have an account &nbsp;
          </Typography>
          <LinkButton query="signup" label="SIGN UP" />
        </Box>
      )}
    </Box>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { req, query } = context;
  const p = query.p ? query.p : "signin";
  const csrfToken = await getCsrfToken(context);
  const callbackUrl = query.callbackUrl
    ? query.callbackUrl
    : process.env.BASE_URL;
  const providers = await getProviders();
  return {
    props: {
      p: JSON.parse(JSON.stringify(p)),
      callbackUrl,
      csrfToken,
      providers: Object.values(providers!),
    },
  };
}

export default Auth;
