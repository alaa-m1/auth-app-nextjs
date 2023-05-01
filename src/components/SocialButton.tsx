import { Button, Grid } from "@mui/material";
import { Provider } from "../types";
import GoogleIcon from "@mui/icons-material/Google";
import InterestsIcon from "@mui/icons-material/Interests";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import StarsIcon from "@mui/icons-material/Stars";
import { signIn } from "next-auth/react";

type SocialButtonsProps = {
  provider: Provider;
  page: string;
  csrfToken: string;
  index: number;
};
const SocialButton = ({
  provider,
  page,
  csrfToken,
  index,
}: SocialButtonsProps) => {
  const { id, name, type } = provider;
  const TargetIcon = () => {
    switch (id) {
      case "google":
        return <GoogleIcon />;
      case "facebook":
        return <FacebookIcon />;
      case "github":
        return <GitHubIcon />;
      case "auth0":
        return <StarsIcon />;
      default:
        return <InterestsIcon />;
    }
  };
  const targetColor =
    id === "google"
      ? "#4285f4"
      : id === "facebook"
      ? "#1877f2"
      : id === "github"
      ? "#23282C"
      : id === "auth0"
      ? "#EA5323"
      : "#000";
  return (
    <Grid
      item
      xs={6}
      md={3}
      sx={{ button: { textTransform: "unset !important" } }}
    >
      <form
        method="post"
        action={`/api/auth/signin/${id}`}
      >
        <input type="hidden" name={csrfToken} defaultValue={csrfToken} />
        <Button
          startIcon={<TargetIcon />}
          sx={{ color: targetColor }}
          onClick={() => signIn(id)}
        >
          {name}
        </Button>
      </form>
    </Grid>
  );
};

export { SocialButton };
