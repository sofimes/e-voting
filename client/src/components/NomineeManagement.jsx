import { Table, Button, message, Modal, Input } from "antd";
import { useEffect, useState } from "react";
import axios from "../utils/api";

const NomineeManagement = () => {
  const [nominees, setNominees] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editNominee, setEditNominee] = useState(null);

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
      } catch (error) {
        console.error("Error fetching nominees:", error.message);
        message.error("Failed to fetch nominees. Please try again later.");
      }
    };

    fetchNominees();
  }, []);

  const handleEditClick = (nominee) => {
    setEditNominee(nominee);
    setIsModalVisible(true);
  };

  const handleEditSubmit = async () => {
    const { _id, name, description } = editNominee;

    if (!name || !description) {
      message.error("Please fill in all fields.");
      return;
    }

    try {
      const token = sessionStorage.getItem("jwt");
      await axios.put(
        `/nominees/edit/${_id}`,
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Nominee updated successfully");
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error editing nominee:", error.message);
      message.error("Failed to update nominee. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditNominee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteClick = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this nominee?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const token = sessionStorage.getItem("jwt");
          await axios.delete(`/nominees/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setNominees((prev) => prev.filter((nominee) => nominee._id !== id));

          message.success("Nominee deleted successfully");
        } catch (error) {
          console.error("Error deleting nominee:", error.message);
          message.error("Failed to delete nominee. Please try again later.");
        }
      },
    });
  };

  const columns = [
    { title: "Nominee ID", dataIndex: "_id", key: "_id" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex gap-2">
          <Button type="link" onClick={() => handleEditClick(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteClick(record._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={nominees} rowKey="_id" />

      <Modal
        title="Edit Nominee"
        visible={isModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          name="name"
          value={editNominee?.name}
          onChange={handleInputChange}
          placeholder="Nominee Name"
        />
        <Input
          name="description"
          value={editNominee?.description}
          onChange={handleInputChange}
          placeholder="Nominee Description"
          style={{ marginTop: 10 }}
        />
      </Modal>
    </>
  );
};

export default NomineeManagement;
