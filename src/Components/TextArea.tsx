// React Imports
import React, { FC, KeyboardEvent } from "react";

// Material UI Imports
import { TextField, TextFieldProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textArea: {
    marginTop: theme.spacing(1),
  },
  input: {
    fontSize: "1.2rem",
  },
}));

type TextAreaProps = TextFieldProps & {
  setValue: (value: string) => void;
  value: string;
};

const TextArea: FC<TextAreaProps> = (props) => {
  const classes = useStyles();

  const checkForAutoFill = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" && !props.value.length) {
      props.setValue(
        props.placeholder ??
          (typeof props.label === "string" ? props.label : "")
      );
    }
  };

  return (
    <TextField
      {...props}
      value={props.value}
      onChange={(e) => props.setValue(e.target.value)}
      onKeyDown={checkForAutoFill}
      variant="outlined"
      rows={3}
      rowsMax={11}
      multiline
      InputProps={{
        classes: {
          input: classes.input,
        },
      }}
      className={classes.textArea}
    />
  );
};

export default TextArea;
