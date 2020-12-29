// React Imports
import React, { FC } from "react";
import Config from "./Components/Config";

// Redux Imports
import { toggleDarkMode, useAppDispatch } from "../../Redux";

// Material UI Imports
import { Switch } from "@material-ui/core";
import { Brightness7, Brightness4 } from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";

const Display: FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  return (
    <Config
      title="Display"
      items={[
        {
          name: "Dark Mode",
          icon:
            theme.palette.type === "dark" ? <Brightness4 /> : <Brightness7 />,
          action: (
            <Switch
              checked={theme.palette.type === "dark"}
              onChange={() =>
                dispatch(toggleDarkMode(theme.palette.type !== "dark"))
              }
              edge="end"
            />
          ),
        },
      ]}
    />
  );
};

export default Display;
