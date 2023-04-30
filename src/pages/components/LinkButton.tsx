import { Button, ButtonTypeMap, ExtendButtonBase } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import { useRouter } from "next/router";

type LinkButtonProps = DefaultComponentProps<ButtonTypeMap<{}, "button">> & {
  to?: string;
  query?: string;
  label: string;
};
const LinkButton = ({ to, query, label, ...props }: LinkButtonProps) => {
  const router = useRouter();
  const pathName = router.pathname;
  return (
    <Button
      disableRipple={true}
      disableElevation={true}
      variant="text"
      color="primary"
      onClick={() => {
        if (query) {
          router.push({ pathname: to ? to : pathName, query: { p: query } });
        } else {
          router.push({ pathname: to ? to : pathName });
        }
      }}
      {...props}
    >
      {label}
    </Button>
  );
};

export { LinkButton };
