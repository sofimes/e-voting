import React from "react";
import PureCounter from "@srexi/purecounterjs";
import { useEffect } from "react";
import HeaderPart from "../common/HeaderPart";
import Testimonial from "../common/Testimonial";
import Main from "../common/Main";
import VoteFeatures from "../common/VoteFeatures";
import CallToAction from "../common/CallAction";
import VoteCounter from "../common/VoteCounter";
import Footer from "../common/Footer";
const Home = () => {
  useEffect(() => {
    new PureCounter(); // Initialize the counter
  }, []);
  return (
    <>
      <HeaderPart />
      <Main />
      <VoteFeatures />
      <CallToAction />
      <VoteCounter />
      <Testimonial />
      <Footer />
    </>
  );
};

export default Home;
