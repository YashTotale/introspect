// React Imports
import React, { FC } from "react";

import Rating from "../Sections/Rating";
import Description from "../Sections/Description";
import Reflection from "../Sections/Reflection";

const Home: FC = () => {
  return (
    <>
      <Rating />
      <Description />
      <Reflection />
    </>
  );
};

export default Home;
