import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { Modal } from "antd";
import Header from "../common/HeaderPart";
import axios from "../utils/api";
import { useVote } from "../context/VoteContext";
const Vote = () => {
  const [nominees, setNominees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedNominee, setSelectedNominee] = useState(null);
  const { incrementVote } = useVote();
  useEffect(() => {
    const fetchNominees = async () => {
      const token = sessionStorage.getItem("jwt"); // Retrieve the token from sessionStorage
      if (!token) {
        alert("Token not found. Please log in again.");
        return;
      }
      try {
        const response = await axios.get("/nominees/getNominee", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Pass the token as a Bearer token
          },
        });
        setNominees(response.data);
      } catch (error) {
        console.error("Error fetching nominees:", error.message);
      }
    };

    fetchNominees();
  }, []);

  // Function to show nominee details modal
  const showNomineeDetails = (nominee) => {
    setSelectedNominee(nominee);
    setIsModalVisible(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedNominee(null);
  };

  // Filter nominees based on the search term
  const filteredNominees = nominees.filter(
    (nominee) =>
      (nominee.name &&
        nominee.name.toLowerCase().startsWith(searchTerm.toLowerCase())) ||
      (nominee.description &&
        nominee.description.toLowerCase().startsWith(searchTerm.toLowerCase()))
  );

  return (
    <>
      <Header />

      <div className="mb-9"></div>
      <div className="mt-31 mb-20 flex flex-col justify-center items-center w-full">
        <h1 className="text-3xl font-semibold text-center mb-4 text-black mt-12">
          Voting Section{" "}
          <span className="text-accentcolor xs:hidden">.................</span>
          <br className="hidden xs:block" />
          <span className="text-xl mb-2">
            Let's build the future
            <span className="text-accentcolor text-xl">.</span>
          </span>
        </h1>

        {/* Search Bar */}
        <div className="mb-8 w-3/4 lg:w-1/2 flex justify-center items-center relative">
          <input
            type="text"
            placeholder="Search for a nominee..."
            className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-mainColor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" size={20} />
        </div>

        {/* Nominee List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:w-2/3 mx-5 w-3/4 mt-8">
          {filteredNominees.length > 0 ? (
            filteredNominees.map((nominee) => (
              <motion.div
                key={nominee._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full lg:w-full h-full bg-white flex flex-col justify-between overflow-hidden"
              >
                <div className="relative ">
                  <img
                    src={`http://localhost:5500/${nominee.image}`}
                    alt={nominee.name}
                    className="w-full h-64 object-cover object-top rounded-xl md:h-72 lg:h-96"
                  />

                  {/* Number of Votes */}
                  <p className="absolute bottom-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm">
                    Votes: {nominee.votes}
                  </p>
                </div>
                <div className="py-6">
                  <h1 className="text-black font-medium text-base mb-2 capitalize">
                    {nominee.name}
                  </h1>
                  <p className="text-gray-500 text-xs line-clamp-3">
                    {nominee.description}
                  </p>
                </div>
                <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0">
                  <button
                    className=" hover:bg-accentcolor hover:text-white py-3 text-sm border border-accentcolor rounded-xl hover:bg-opacity-80 transition duration-500 lg:w-1/2 lg:mr-2 text-black"
                    onClick={async () => {
                      const token = sessionStorage.getItem("jwt"); // Retrieve the token from sessionStorage
                      if (!token) {
                        alert("Token not found. Please log in again.");
                        return;
                      }
                      try {
                        const response = await axios.put(
                          `/nominees/vote/${nominee._id}`,
                          {},
                          {
                            headers: {
                              "Content-Type": "application/json", // Change if needed
                              Authorization: `Bearer ${token}`, // Pass the token as a Bearer token
                            },
                          }
                        );
                        incrementVote();
                        alert(`You voted for: ${nominee.name}`);
                        setNominees((prev) =>
                          prev.map((n) =>
                            n._id === nominee._id
                              ? { ...n, votes: n.votes + 1 }
                              : n
                          )
                        );
                      } catch (error) {
                        console.error("Error voting:", error.message);
                      }
                    }}
                  >
                    Vote
                  </button>
                  <button
                    className="bg-white text-black py-3 text-sm border border-gray-400 rounded-xl hover:bg-nomineeDetail hover:border-accentcolor lg:ml-2  transition duration-500 lg:w-1/2"
                    onClick={() => showNomineeDetails(nominee)}
                  >
                    Personal Detail
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">
              No nominees found for "{searchTerm}"
            </p>
          )}
        </div>
        {/* Modal for nominee Details */}
        <Modal
          className=""
          title={selectedNominee?.name || "Course Details"}
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
          width={700}
        >
          <h4 className="font-bold text-lg text-gray-800 mt-4">
            Nominee Details:
          </h4>
          <p>{selectedNominee?.description}</p>
        </Modal>
      </div>
    </>
  );
};

export default Vote;
