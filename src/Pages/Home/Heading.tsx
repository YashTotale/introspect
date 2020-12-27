// React Imports
import React, { FC } from "react";
import BaseHeading from "../../Components/Reusable/Heading";
import useClosableSnackbar from "../../Hooks/useClosableSnackbar";

// Redux Imports
import {
  clearTodayData,
  TodayDataType,
  undoTodayData,
} from "../../Redux/today.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { Button, capitalize } from "@material-ui/core";
import { Clear } from "@material-ui/icons";

interface HeadingProps {
  name: TodayDataType;
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
          dispatch(clearTodayData(name));
          enqueueSnackbar(`${capitalize(name)} cleared`, {
            variant: "success",
            autoHideDuration: 4000,
            action: (key) => {
              const Undo = (
                <Button
                  onClick={() => {
                    dispatch(undoTodayData(name));
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
