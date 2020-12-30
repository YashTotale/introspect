// React Imports
import React, { FC } from "react";
import { Heading, TextArea } from "./Components";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getDescription,
  getSavedPrefix,
  setHomeData,
  useAppDispatch,
} from "../../Redux";

interface DescriptionProps {}

const Description: FC<DescriptionProps> = () => {
  const dispatch = useAppDispatch();

  const description = useSelector(getDescription);
  const descriptionPrefix = useSelector(getSavedPrefix("description"));

  return (
    <>
      <Heading name="description" clearable={!!description.length}>
        Describe your day
      </Heading>
      <TextArea
        value={description}
        setValue={(value) => dispatch(setHomeData({ description: value }))}
        label="Description"
        placeholder={descriptionPrefix}
      />
    </>
  );
};

export default Description;
