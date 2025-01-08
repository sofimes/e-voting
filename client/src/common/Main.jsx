import React from "react";
import img1 from "../assets/images/hero-bg.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Main = () => {
  return (
    <motion.section
      className="bg-concolor top-0  w-full  flex items-center justify-center min-h-screen py-[120px] px-0  text-headingcolor hero  scroll-mt-20 overflow-clip"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <img
        src={img1}
        alt=""
        data-aos="fade-in"
        className="absolute w-full h-full inset-0 block object-cover object-center z-1"
      />
      <div className="container relative z-[3] ">
        <div
          className="flex flex-wrap justify-center text-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="w-full lg:w-8/12 xl:w-6/12">
            <motion.h2
              className="m-0 text-[56px] font-bold text-white font-navfont"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Powerful Digital <br />
              Solutions With <span className="text-cyan-500">SRT</span>
              <span className="text-2xl text-cyan-500">.</span>
            </motion.h2>
            <motion.p
              className="text-pcolor text-[24px] mt-[10px]font-navfont font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Secure <span className="text-2xl text-cyan-500">.</span> Simple{" "}
              <span className="text-2xl text-cyan-500">.</span> Smart Voting{" "}
              <span className="text-2xl text-cyan-500">.</span>
            </motion.p>
          </div>
          <div></div>
        </div>

        <motion.div
          className="justify-center mt-5 gap-y-4 flex flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={index}
              className="col-span-12 md:col-span-4 xl:col-span-2 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
            >
              <div className="p-[30px_20px] items-center flex flex-col justify-center text-center transition ease-in-out duration-300 border-color-mix hover:border-accentcolor hover:text-accentcolor">
                <i className="font-[32px] text-accentcolor leading-[1] bi bi-binoculars"></i>
                <motion.h3
                  className="font-bold mt-[10px] mb-0 ml-0 mr-0 p-0 leading-[1] text-[20px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                >
                  <Link className="transition ease-in-out text-color-mix hover:text-accentcolor">
                    <span className="text-cyan-500">
                      {["E", "V", "O", "T", "E"][index]}
                    </span>
                    {
                      [
                        "fficient",
                        "erifiable",
                        "ptimized",
                        "ransparent",
                        "asy-to-use",
                      ][index]
                    }
                  </Link>
                </motion.h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Main;
