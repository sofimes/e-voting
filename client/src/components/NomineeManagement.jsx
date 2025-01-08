import { Table, Button, message } from "antd";
import { useEffect, useState } from "react";
import axios from "../utils/api";
const NomineeManagement = () => {
  const [nominees, setNominees] = useState([]);

  useEffect(() => {
    const fetchNominees = async () => {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        message.error("Token not found. Please log in again.");
        return;
      }
      try {
        const response = await axios.get("/nominees/getNominee", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNominees(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching nominees:", error.message);
        message.error("Failed to fetch nominees. Please try again later.");
      }
    };

    fetchNominees();
  }, []);

  const columns = [
    { title: "Nominee ID", dataIndex: "_id", key: "_id" },
    { title: "Name", dataIndex: "name", key: "name" },
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

  return <Table columns={columns} dataSource={nominees} rowKey="id" />;
};

export default NomineeManagement;
