// React Imports
import React, { FC, useState } from "react";

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

type TextAreaProps = TextFieldProps;

const TextArea: FC<TextAreaProps> = (props) => {
  const classes = useStyles();

  const [value, setValue] = useState("");

  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      variant="outlined"
      rows={2}
      rowsMax={10}
      multiline
      InputProps={{
        classes: {
          input: classes.input,
        },
      }}
      className={classes.textArea}
      {...props}
    />
  );
};

export default TextArea;
