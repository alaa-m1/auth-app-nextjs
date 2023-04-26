import { Alert, Box } from "@mui/material";
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useId,
} from "react";
import ErrorIcon from "@mui/icons-material/Error";

type TextFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  icon: JSX.Element;
  register: any;
  errors: any;
  //   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
const TextField = ({
  name,
  label,
  icon,
  register,
  errors,
  //   onChange,
  ...props
}: TextFieldProps) => {
  const id = useId();
  return (
    <Box
      sx={{
        width: "auto",
        padding: "0px 10px",
        margin: "10px 0px",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "auto",
          textAlign: "left",
          ">input:focus": {
            borderWidth: "1px",
            borderColor: errors ? "#d32f2f" : "#ccc",
            outlineColor: errors ? "#d32f2f" : "#ccc",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: "4px",
            left: "5px",
            svg: { padding: "0px", margin: "0px 0px 3px 5px" },
          }}
        >
          {icon}
        </Box>
        <label htmlFor={`input-${id}`} style={{ marginLeft: "5px" }}>
          {label}
        </label>
        <br />
        <input
          id={`input-${id}`}
          type="text"
          name={name}
          // onChange={onChange}
          {...register(name)}
          className="custom-input"
          {...props}
          style={{
            padding: "8px 5px 8px 30px",
            margin: "5px",
            borderWidth: "1px",
            borderColor: errors ? "#d32f2f" : "#ccc",
            borderRadius: "6px",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
        {errors && (
          <Box
            sx={{
              position: "absolute",
              bottom: "4px",
              right: "10px",
              svg: {
                padding: "0px",
                margin: "0px 0px 3px 5px",
                color: "#d32f2f",
              },
            }}
          >
            <ErrorIcon />
          </Box>
        )}
      </Box>
      {errors && <Alert severity="error">{errors}</Alert>}
    </Box>
  );
};

export default TextField;
