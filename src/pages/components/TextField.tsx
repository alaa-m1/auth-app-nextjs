import { Box } from "@mui/material";
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useId,
} from "react";

type TextFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  name: string;
  value: string | number | readonly string[] | undefined;
  placeholder: string;
  icon: JSX.Element;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
const TextField = ({
  label,
  name,
  value,
  placeholder,
  icon,
  onChange,
  ...props
}: TextFieldProps) => {
  const id = useId();
  return (
    <Box
      sx={{
        position: "relative",
        width: "auto",
        border: "1px solid #0af",
        borderRadius: "6px",
        padding: "0px 10px",
        textAlign: "left",
        margin: "10px 5px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: "0px",
          left: "10px",
          svg: { padding: "0px", marginBottom: "-5px" },
        }}
      >
        {icon}
      </Box>
      <label htmlFor={`input-${id}`}>{label}</label>
      <br />
      <input
        name={name}
        value={value}
        id={`input-${id}`}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="custom-input"
        {...props}
      />
    </Box>
  );
};

export default TextField;
