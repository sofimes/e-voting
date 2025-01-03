import React from "react";
import { motion } from "framer-motion";
import { LuLockKeyhole } from "react-icons/lu";
import img2 from "../assets/images/features-bg.jpg";
import { FaHandshakeSimple } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { MdOutlinePhoneAndroid } from "react-icons/md";

const VoteFeatures = () => {
  return (
    <motion.section
      className="py-20 scroll-mt-20 overflow-clip"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-10 my-2 mb-10">
        <motion.h2
          className="text-3xl font-bold mb-[15px] text-center text-accentcolor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          An online voting system with your needs at the forefront.
        </motion.h2>
        <motion.p
          className="text-[17px] text-contrastcolor m-0 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          From secure polling software to the management of complex virtual
          voting events, we offer a range of online voting software options that
          exceed expectations.
        </motion.p>
      </div>
      <div className="container mx-auto px-20 my-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            className="relative min-h-[400px] col-span-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <img
              src={img2}
              alt="voting tool"
              className="absolute rounded-xl inset-0 block w-full h-full object-cover z-1"
            />
          </motion.div>
          <div className="col-span-1 space-y-6">
            {[
              {
                icon: <LuLockKeyhole />,
                title: "A reliable online voting tool",
                description:
                  "Run online election for an important event or manage consistent, recurring votes.",
              },
              {
                icon: <FaCheck />,
                title: "Key electronic voting features.",
                description:
                  "Stay protected against double voting and other forms of vote manipulation. Get results instantly and dive deeper into voter analytics.",
              },
              {
                icon: <MdOutlinePhoneAndroid />,
                title: "Web app-based voting platform.",
                description:
                  "Send eligible voters to a personalized voting website, without having to download an online voting app.",
              },
              {
                icon: <FaHandshakeSimple />,
                title: "A pleasant way to cast votes.",
                description:
                  "Voters deserve a fair and easy to use voting website, accessible from any device.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex pl-0 lg:pl-3 pt-4 lg:pt-0 items-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
              >
                <i className="text-accentcolor text-[48px] mr-[20px]">
                  {feature.icon}
                </i>
                <div>
                  <motion.h4
                    className="text-[20px] font-bold mb-[5px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 + index * 0.2 }}
                  >
                    {feature.title}
                  </motion.h4>
                  <motion.p
                    className="text-[14px] text-contrastcolor m-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 + index * 0.2 }}
                  >
                    {feature.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default VoteFeatures;
