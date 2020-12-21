// React Imports
import React, { FC } from "react";
import Heading from "./Heading";
import TextArea from "./TextArea";

// Redux Imports
import {
  clearReflection,
  getReflection,
  setReflection,
  useAppDispatch,
} from "../Redux";
import { useSelector } from "react-redux";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

interface ReflectionProps {}

const Reflection: FC<ReflectionProps> = () => {
  const classes = useStyles();

  const reflection = useSelector(getReflection);

  const dispatch = useAppDispatch();

  return (
    <>
      <Heading onClear={() => dispatch(clearReflection())}>
        Reflect on your day
      </Heading>
      <TextArea
        value={reflection}
        setValue={(value) => dispatch(setReflection(value))}
        label="Reflections"
        placeholder="Reflections: "
      />
    </>
  );
};

export default Reflection;
