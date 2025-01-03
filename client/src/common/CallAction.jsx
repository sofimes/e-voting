import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import img3 from "../assets/images/cta-bg.jpg";
const CallToAction = () => {
  return (
    <motion.section
      className="bg-surfacecolor relative calltoaction clip-inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 z-10">
        <img className="w-full h-full object-cover" src={img3} alt="" />

        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>
      <div className="relative z-30 flex justify-center items-center h-full py-8">
        <div className="justify-center" data-aos="zoom-in" data-aos-delay="100">
          <div className="w-full max-w-screen-xl text-center text-white px-6 my-10">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.h3
                className="text-[28px] font-bold mb-3"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Call To Action
              </motion.h3>
              <motion.p
                className="text-white mb-6 px-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Unlimited, self-administered ballots. Simple voter list
                management. Voter notifications. Real-time results. Anonymous &
                weighted voting options. Product knowledge base. Email support.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <Link
                  to="/vote"
                  className="text-white text-sm px-8 py-2 ml-[30px] rounded-xl border-2 border-cyan-500 transition duration-300 hover:text-default-color hover:bg-accentcolor"
                >
                  Start Vote
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CallToAction;
