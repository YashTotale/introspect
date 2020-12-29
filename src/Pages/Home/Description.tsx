// React Imports
import React, { FC } from "react";
import { Heading, TextArea } from "./Components";

// Redux Imports
import { useSelector } from "react-redux";
import { getDescription, setHomeData, useAppDispatch } from "../../Redux";

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
