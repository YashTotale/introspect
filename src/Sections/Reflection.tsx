// React Imports
import React, { FC } from "react";
import Heading from "../Components/Reusable/Heading";
import TextArea from "../Components/Reusable/TextArea";

// Redux Imports
import {
  clearReflection,
  getReflection,
  setReflection,
  undoReflection,
  useAppDispatch,
} from "../Redux";
import { useSelector } from "react-redux";

interface ReflectionProps {}

const Reflection: FC<ReflectionProps> = () => {
  const reflection = useSelector(getReflection);

  const dispatch = useAppDispatch();

  return (
    <>
      <Heading
        name="Reflections"
        clear={() => dispatch(clearReflection())}
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
