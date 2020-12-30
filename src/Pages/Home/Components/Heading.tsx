// React Imports
import React, { FC } from "react";
import { BaseHeading } from "../../../Components/Reusable";
import { useClosableSnackbar } from "../../../Hooks";

// Redux Imports
import {
  clearHomeData,
  HomeDataType,
  undoHomeData,
  useAppDispatch,
} from "../../../Redux";

// Material UI Imports
import { Button, capitalize } from "@material-ui/core";
import { Clear } from "@material-ui/icons";

interface HeadingProps {
  name: HomeDataType;
  clearable: boolean;
}

const Heading: FC<HeadingProps> = ({ name, clearable, children }) => {
  const dispatch = useAppDispatch();

  const { enqueueSnackbar, closeSnackbar } = useClosableSnackbar();

  return (
    <BaseHeading
      icon={<Clear fontSize="small" />}
      IconButtonProps={{
        onClick: () => {
          dispatch(clearHomeData(name));
          enqueueSnackbar(`${capitalize(name)} cleared`, {
            variant: "success",
            autoHideDuration: 6000,
            action: (key) => {
              const Undo = (
                <Button
                  onClick={() => {
                    dispatch(undoHomeData(name));
                    closeSnackbar(key);
                  }}
                  variant="text"
                >
                  Undo
                </Button>
              );
              return Undo;
            },
          });
        },
        disabled: !clearable,
      }}
      iconTitle="Clear"
    >
      {children}
    </BaseHeading>
  );
};

export default Heading;
