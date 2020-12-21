// React Imports
import React, { FC } from "react";
import Heading from "../Components/Reusable/Heading";
import TextArea from "../Components/Reusable/TextArea";

// Redux Imports
import {
  getDescription,
  setDescription,
  undoDescription,
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
  const dispatch = useAppDispatch();

  const description = useSelector(getDescription);

  return (
    <>
      <Heading
        name="Description"
        clear={() => dispatch(setDescription(""))}
        undo={() => dispatch(undoDescription())}
        clearable={!!description.length}
      >
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
