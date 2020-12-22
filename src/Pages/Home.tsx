// React Imports
import React, { FC, lazy, Suspense } from "react";
import Bar from "../Components/Loading/Bar";

const Rating = lazy(() => import("../Sections/Rating"));
const Description = lazy(() => import("../Sections/Description"));
const Reflection = lazy(() => import("../Sections/Reflection"));

const Home: FC = () => {
  return (
    <>
      <Suspense fallback={<Bar size="small" />}>
        <Rating />
      </Suspense>
      <Suspense fallback={<Bar size="large" />}>
        <Description />
      </Suspense>
      <Suspense fallback={<Bar size="large" />}>
        <Reflection />
      </Suspense>
    </>
  );
};

export default Home;
