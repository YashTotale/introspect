// React Imports
import { Typography } from "@material-ui/core";
import React, { FC, lazy, Suspense } from "react";
import { Bar } from "../../Components/Loading";

const Rating = lazy(() => import("./Rating"));
const Description = lazy(() => import("./Description"));
const Reflection = lazy(() => import("./Reflection"));
const Footer = lazy(() => import("./Footer"));

const Home: FC = () => {
  return (
    <>
      <Typography variant="h4" align="center">
        Home
      </Typography>
      <Suspense fallback={<Bar size="small" />}>
        <Rating />
      </Suspense>
      <Suspense fallback={<Bar size="large" />}>
        <Description />
      </Suspense>
      <Suspense fallback={<Bar size="large" />}>
        <Reflection />
      </Suspense>
      <Suspense fallback={<Bar size="xs" />}>
        <Footer />
      </Suspense>
    </>
  );
};

export default Home;
