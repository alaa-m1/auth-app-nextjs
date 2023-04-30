import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  Link,
  useTheme,
} from "@mui/material";
import { LinkButton, TextField } from "../../components";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LockIcon from "@mui/icons-material/Lock";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";
import zxcvbn from "zxcvbn";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { ScaleLoader } from "react-spinners";
import { NextPageContext } from "next/types";
import { useRouter } from "next/router";

const UserSchema = z
  .object({
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

const ResetPassword = ({ token }: { token: string }) => {
  const [passwordScore, setPasswordScore] = useState(0);
  const timerRef = useRef<any>(null);
  const router = useRouter();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserSchemaType>({ resolver: zodResolver(UserSchema) });
  const onSubmit: SubmitHandler<UserSchemaType> = async (values) => {
    try {
      const { data } = await axios.post("/api/auth/resetpassword", {
        password: values.password,
        token,
      });
      reset();
      timerRef.current = setTimeout(() => router.push({ pathname: "/" }), 1000);
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const { password } = watch();
  useEffect(() => {
    const calculatePasswordStrengthScore = () => {
      return zxcvbn(password ? password : "").score;
    };
    setPasswordScore(calculatePasswordStrengthScore());
  }, [password]);
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
      <Typography variant="h4" color="primary">
        Reset your password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "5px 10px" }}>
        <TextField
          name="password"
          label="Password"
          placeholder=""
          icon={<LockIcon />}
          type="password"
          register={register}
          errors={errors.password?.message}
          disabled={isSubmitting}
          autoComplete="off"
          defaultValue=""
        ></TextField>
        {watch().password && watch().password.length > 0 && (
          <Grid container sx={{ margin: "0px 0px 15px 10px" }}>
            {Array.from(Array(5).keys()).map((item, index) => (
              <Grid
                key={index}
                item
                xs={2}
                sx={{
                  backgroundColor:
                    passwordScore <= 2
                      ? "#f00"
                      : passwordScore < 4
                      ? "#ff0"
                      : "#0f0",
                  height: "8px",
                  borderRadius: "5px",
                  margin: "0px 5px",
                  boxSizing: "border-box",
                }}
              ></Grid>
            ))}
          </Grid>
        )}
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          placeholder=""
          icon={<LockIcon />}
          type="password"
          register={register}
          errors={errors.confirmPassword?.message}
          disabled={isSubmitting}
          autoComplete="off"
        ></TextField>
        <LoadingButton
          loading={isSubmitting}
          loadingIndicator={<ScaleLoader color="#36d7b7" />}
          variant="contained"
          color="primary"
          type="submit"
          sx={{ width: "50%", margin: "0px auto" }}
        >
          Reset your password
        </LoadingButton>
      </form>
      <Box sx={{ "button:hover": { backgroundColor: "transparent" } }}>
        <Divider
          variant="fullWidth"
          orientation="horizontal"
          sx={{ margin: "20px 5px", display: "flex" }}
        />
        <Typography
          variant="caption"
          color={theme.palette.text.secondary}
          fontSize={18}
        >
          If you already have an account &nbsp;
        </Typography>
        <LinkButton to="/" label="SIGN In" />
      </Box>
    </Box>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  const token = query.token;
  return {
    props: { token },
  };
}

export default ResetPassword;
