// React Imports
import React, { FC } from "react";
import Heading from "../Components/Reusable/Heading";
import TextArea from "../Components/Reusable/TextArea";

// Redux Imports
import {
  getReflection,
  setReflection,
  undoReflection,
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
      <Heading
        name="Reflections"
        clear={() => dispatch(setReflection(""))}
        undo={() => dispatch(undoReflection())}
        clearable={!!reflection}
      >
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
