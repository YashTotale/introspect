// React Imports
import React, { FC } from "react";
import Heading from "../Components/Heading";
import TextArea from "../Components/TextArea";

// Redux Imports
import {
  clearDescription,
  getDescription,
  setDescription,
  useAppDispatch,
} from "../Redux";
import { useSelector } from "react-redux";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

interface DescriptionProps {}

const Description: FC<DescriptionProps> = () => {
  const classes = useStyles();

  const description = useSelector(getDescription);

  const dispatch = useAppDispatch();

  return (
    <>
      <Heading onClear={() => dispatch(clearDescription())}>
        Describe your day
      </Heading>
      <TextArea
        value={description}
        setValue={(value) => dispatch(setDescription(value))}
        label="Description"
        placeholder="Today was ..."
      />
    </>
  );
};

export default Description;
