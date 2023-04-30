import { Box, Typography } from "@mui/material";
import { TextField } from "../components";
import EmailIcon from "@mui/icons-material/Email";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-toastify";

const UserSchema = z.object({
  email: z.string().email("You must enter a valid Email"),
});

type UserSchemaType = z.infer<typeof UserSchema>;

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserSchemaType>({ resolver: zodResolver(UserSchema) });
  const onSubmit: SubmitHandler<UserSchemaType> = async (values) => {
    try {
      const { data } = await axios.post("/api/auth/forgetpassword", {
        email: values.email,
      });
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" color="primary">
        Reset your password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "5px 10px" }}>
        <TextField
          name="email"
          label="Email"
          placeholder="Email"
          icon={<EmailIcon />}
          register={register}
          errors={errors.email?.message}
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
    </Box>
  );
};

export default ForgetPassword;
