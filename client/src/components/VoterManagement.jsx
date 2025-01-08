import { Table, Button, message } from "antd";
import { useEffect, useState } from "react";
import axios from "../utils/api";

const VoterManagement = () => {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const fetchVoters = async () => {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        message.error("Token not found. Please log in again.");
        return;
      }
      try {
        const response = await axios.get("/voters/getVoters", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setVoters(
          Array.isArray(response.data) ? response.data : [response.data]
        );
      } catch (error) {
        console.error("Error fetching voters:", error.message);
        message.error("Failed to fetch voters. Please try again later.");
      }
    };

    fetchVoters();
  }, []);

  const columns = [
    { title: "User ID", dataIndex: ["voterId", "_id"], key: "_id" },
    { title: "Full Name", dataIndex: ["voterId", "fullName"], key: "fullName" },
    { title: "Email", dataIndex: ["voterId", "email"], key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex gap-2">
          <Button type="link">Edit</Button>
          <Button type="link" danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={voters}
      rowKey={(record) => record.voterId?._id}
    />
  );
};

export default VoterManagement;
