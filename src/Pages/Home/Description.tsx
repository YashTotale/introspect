// React Imports
import React, { FC } from "react";
import Heading from "./Heading";
import TextArea from "../../Components/Reusable/TextArea";

// Redux Imports
import { getDescription, setHomeData, useAppDispatch } from "../../Redux";
import { useSelector } from "react-redux";

interface DescriptionProps {}

const Description: FC<DescriptionProps> = () => {
  const dispatch = useAppDispatch();

  const description = useSelector(getDescription);

  return (
    <>
      <Heading name="description" clearable={!!description.length}>
        Describe your day
      </Heading>
      <TextArea
        value={description}
        setValue={(value) => dispatch(setHomeData({ description: value }))}
        label="Description"
        placeholder="Today was ..."
      />
    </>
  );
};

export default Description;
