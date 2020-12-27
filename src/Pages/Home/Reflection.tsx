// React Imports
import React, { FC } from "react";
import Heading from "./Heading";
import TextArea from "../../Components/Reusable/TextArea";

// Redux Imports
import { getReflection, setTodayData, useAppDispatch } from "../../Redux";
import { useSelector } from "react-redux";

interface ReflectionProps {}

const Reflection: FC<ReflectionProps> = () => {
  const reflection = useSelector(getReflection);

  const dispatch = useAppDispatch();

  return (
    <>
      <Heading name="reflection" clearable={!!reflection}>
        Reflect on your day
      </Heading>
      <TextArea
        value={reflection}
        setValue={(value) => dispatch(setTodayData({ reflection: value }))}
        label="Reflection"
        placeholder="Reflection: "
      />
    </>
  );
};

export default Reflection;
