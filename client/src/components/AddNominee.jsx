// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// const AddNominee = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageFile, setImageFile] = useState("");

//   const handleAddNominee = async (e) => {
//     e.preventDefault();
//     if (!imageFile) {
//       alert("Please upload an image for the nominee.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("image", imageFile);
//     try {
//       const response = await axios.post("/api/nominees", {
//         name,
//         description,
//         image,
//       });
//       alert(response.data.message);
//       setName("");
//       setDescription("");
//       setImage("");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to add nominee. Admin access is required.");
//     }
//   };

//   return (
//     <motion.div
//       className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto"
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//         Add New Nominee
//       </h2>
//       <form onSubmit={handleAddNominee} className="grid grid-cols-1 gap-4">
//         <motion.input
//           type="text"
//           placeholder="Nominee Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           whileFocus={{ scale: 1.05 }}
//         />
//         <motion.textarea
//           placeholder="Nominee Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//           rows={4}
//           whileFocus={{ scale: 1.05 }}
//         />
//         <motion.input
//           type="text"
//           placeholder="Nominee Image URL"
//           value={image}
//           onChange={(e) => setImage(e.target.value)}
//           className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           whileFocus={{ scale: 1.05 }}
//         />
//         <motion.button
//           type="submit"
//           className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Add Nominee
//         </motion.button>
//       </form>
//     </motion.div>
//   );
// };

// export default AddNominee;

// import React, { useState, useEffect } from "react";
// import axios from "../utils/api";
// import { motion } from "framer-motion";

// const AddNominee = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageFile, setImageFile] = useState(null);

//   const handleAddNominee = async (e) => {
//     e.preventDefault();

//     if (!name || !description) {
//       alert("Please fill in all fields and upload an image.");
//       return;
//     }
//     if (!imageFile) {
//       alert("Please upload an image for the nominee.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("image", imageFile);

//     try {
//       const token = sessionStorage.getItem("jwt"); // Retrieve the token from sessionStorage
//       if (!token) {
//         alert("Token not found. Please log in again.");
//         return;
//       }
//       const response = await axios.post("/nominees/addnominees", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });
//       alert(response.data.message);
//       setName("");
//       setDescription("");
//       setImageFile(null);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to add nominee. Admin access is required.");
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//     }
//   };

//   return (
//     <motion.div
//       className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto"
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//         Add New Nominee
//       </h2>
//       <form onSubmit={handleAddNominee} className="grid grid-cols-1 gap-4">
//         <motion.input
//           type="text"
//           placeholder="Nominee Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           whileFocus={{ scale: 1.05 }}
//         />
//         <motion.textarea
//           placeholder="Nominee Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//           rows={4}
//           whileFocus={{ scale: 1.05 }}
//         />
//         <motion.input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           whileFocus={{ scale: 1.05 }}
//         />
//         <motion.button
//           type="submit"
//           className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Add Nominee
//         </motion.button>
//       </form>
//     </motion.div>
//   );
// };

// export default AddNominee;
import React, { useState } from "react";
import axios from "../utils/api";
import { motion } from "framer-motion";

const AddNominee = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddNominee = async (e) => {
    e.preventDefault();

    if (!name || !description || !imageFile) {
      setErrorMessage("Please fill in all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", imageFile);
    console.log(sessionStorage.getItem("jwt"));

    try {
      const token = sessionStorage.getItem("jwt"); // Retrieve the token from sessionStorage
      if (!token) {
        alert("Token not found. Please log in again.");
        return;
      }

      const response = await axios.post("/nominees/addnominees", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Pass the token as a Bearer token
        },
        // withCredentials: true,
      });
      console.log(token);
      console.log(response)
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setName("");
      setDescription("");
      setImageFile(null);
    } catch (error) {
      console.error(error.response?.data?.error || "Failed to add nominee.");
      setErrorMessage(error.response?.data?.error || "Failed to add nominee.");
      setSuccessMessage("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleFocus = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <motion.div
      className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Add New Nominee
      </h2>
      <form onSubmit={handleAddNominee} className="grid grid-cols-1 gap-4">
        <motion.input
          type="text"
          placeholder="Nominee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={handleFocus}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          whileFocus={{ scale: 1.05 }}
        />
        <motion.textarea
          placeholder="Nominee Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onFocus={handleFocus}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={4}
          whileFocus={{ scale: 1.05 }}
        />
        <motion.input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          onFocus={handleFocus}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          whileFocus={{ scale: 1.05 }}
        />
        {errorMessage && (
          <div className="text-red-700 text-center mb-4">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-700 text-center mb-4">
            {successMessage}
          </div>
        )}
        <motion.button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Nominee
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddNominee;
