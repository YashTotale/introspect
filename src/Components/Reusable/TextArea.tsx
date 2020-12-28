// React Imports
import React, { FC, KeyboardEvent, ReactNode } from "react";

// Material UI Imports
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textArea: {
    marginTop: theme.spacing(1),
  },
  input: {
    fontSize: "1.2rem",
  },
}));

interface TextAreaProps {
  setValue: (value: string) => void;
  value: string;
  placeholder?: string;
  label?: ReactNode;
  className?: string;
}

const TextArea: FC<TextAreaProps> = ({
  setValue,
  value,
  placeholder,
  label,
  className,
}) => {
  const classes = useStyles();

  const checkForAutoFill = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" && !value.length) {
      setValue(placeholder ?? (typeof label === "string" ? label : ""));
    }
  };

  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={checkForAutoFill}
      variant="outlined"
      rows={2}
      rowsMax={11}
      placeholder={placeholder}
      label={label}
      multiline
      InputProps={{
        classes: {
          input: classes.input,
        },
      }}
      className={`${classes.textArea} ${className}`}
    />
  );
};

export default TextArea;
