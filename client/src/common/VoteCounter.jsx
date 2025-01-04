import React from "react";
import { motion } from "framer-motion";
import { MdHowToVote, MdPeopleAlt } from "react-icons/md"; // Ensure you import the necessary icons
import img4 from "../assets/images/stats-img.jpg";
import { useState } from "react";
const VoteCounter = ({ voteCount }) => {
  return (
    <motion.section
      className="relative vote-counter clip-inset-0 py-20 scroll-mt-20 overflow-clip"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container lg:px-12 px-6 mx-auto">
        <motion.div
          className="flex flex-wrap items-center justify-between gap-y-4 lg:px-20 px-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="w-full lg:w-5/12 relative min-h-[400px] xs:min-h-0 pb-3 xs:pb-0"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              src={img4}
              alt=""
              className="w-full rounded-xl object-cover h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]"
            />
          </motion.div>
          <motion.div
            className="w-full lg:w-6/12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h3 className="font-bold text-3xl mb-3">Current Voting Status</h3>
            <p className="text-[17px] text-contrastcolor m-0">
              Stay updated with the ongoing election process! Every vote counts
              towards shaping the future. Keep track of the results as they come
              in, and don't forget to participate if you haven't already. The
              current status reflects the most accurate and up-to-date
              information about the election.
            </p>
            <motion.div
              className="flex flex-wrap gap-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <motion.div
                className="w-full lg:w-6/12"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <div className="stats-item p-[10px] flex">
                  <i className="flex-shrink-0 text-accentcolor text-[48px] mr-[15px] leading-8">
                    <MdHowToVote />
                  </i>
                  <div>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end={`${voteCount}`}
                      data-purecounter-duration="1"
                      className="purecounter text-[40px] font-bold block"
                    ></span>
                    <p className="pt-3 m-0 text-[14px]">
                      <strong className="text-2xl text-accentcolor">
                        Votes
                      </strong>
                      <br />
                      <span className="text-xl text-contrastcolor"></span>
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="w-full lg:w-6/12"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <div className="stats-item p-[10px] flex">
                  <i className="flex-shrink-0 text-accentcolor text-[48px] mr-[15px] leading-8">
                    <MdPeopleAlt />
                  </i>
                  <div>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="6"
                      data-purecounter-duration="1"
                      className="purecounter text-[40px] font-bold block"
                    ></span>
                    <p className="pt-3 m-0 text-[14px]">
                      <strong className="text-2xl text-accentcolor">
                        Nominees
                      </strong>
                      <br />
                      <span className="text-xl text-contrastcolor">
                        {/* Adipisci atque cum quia */}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default VoteCounter;
