// React Imports
import React, { FC } from "react";
import { Heading, TextArea } from "./Components";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getDescription,
  getPrefix,
  setHomeData,
  useAppDispatch,
} from "../../Redux";

interface DescriptionProps {}

const Description: FC<DescriptionProps> = () => {
  const dispatch = useAppDispatch();

  const description = useSelector(getDescription);
  const descriptionPrefix = useSelector(getPrefix("description"));

  return (
    <>
      <Heading
        name="description"
        clearable={!!description.length}
        info="Press the Right Arrow when the description is empty to fill it with the placeholder"
      >
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
