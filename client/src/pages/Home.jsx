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
import { useVote } from "../context/VoteContext";
const Home = () => {
  useEffect(() => {
    new PureCounter();
  }, []);
  const { voteCount } = useVote();
  return (
    <>
      <HeaderPart />
      <Main />
      <section id="features">
        <VoteFeatures id="features" />
      </section>
      <section id="action">
        <CallToAction />
      </section>
      <section id="counter">
        <VoteCounter voteCount={voteCount} id="counter" />
      </section>
      <Testimonial />
      <section id="contact">
        <Footer id="contact" />
      </section>
    </>
  );
};

export default Home;
