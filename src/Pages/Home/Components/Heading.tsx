// React Imports
import React, { FC } from "react";
import { BaseHeading, NearTooltip } from "../../../Components/Reusable";
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
import { Clear, InfoOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  typography: {
    position: "relative",
  },
  info: {
    position: "absolute",
    top: "50%",
    transform: "translate(0%, -50%)",
    left: theme.spacing(1),
  },
}));

interface HeadingProps {
  name: HomeDataType;
  clearable: boolean;
  info?: string;
}

const Heading: FC<HeadingProps> = ({ name, clearable, children, info }) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

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
      typographyClassName={classes.typography}
    >
      {info && (
        <NearTooltip title={info} spacing={0.75}>
          <InfoOutlined className={classes.info} />
        </NearTooltip>
      )}
      {children}
    </BaseHeading>
  );
};

export default Heading;
