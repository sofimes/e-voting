import { Table, Button, message, Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import axios from "../utils/api";

const VoterManagement = () => {
  const [voters, setVoters] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingVoter, setEditingVoter] = useState(null);
  const [form] = Form.useForm();

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

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("jwt");
    Modal.confirm({
      title: "Are you sure you want to delete this voter?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await axios.delete(`/voters/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          message.success("Voter deleted successfully");
          setVoters((prev) => prev.filter((voter) => voter.voterId._id !== id));
        } catch (error) {
          console.error("Error deleting voter:", error.message);
          message.error("Failed to delete voter. Please try again later.");
        }
      },
    });
  };

  const handleEdit = (voter) => {
    setEditingVoter(voter);
    setIsEditModalOpen(true);
    form.setFieldsValue({
      fullName: voter.voterId.fullName,
      email: voter.voterId.email,
    });
  };

  const handleSave = async (values) => {
    const token = sessionStorage.getItem("jwt");
    try {
      await axios.put(`/voters/edit/${editingVoter.voterId._id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Voter updated successfully");
      setVoters((prev) =>
        prev.map((voter) =>
          voter.voterId._id === editingVoter.voterId._id
            ? { ...voter, voterId: { ...voter.voterId, ...values } }
            : voter
        )
      );
      setIsEditModalOpen(false);
      setEditingVoter(null);
    } catch (error) {
      console.error("Error updating voter:", error.message);
      // message.error("Failed to update voter. Please try again later.");
    }
  };

  const columns = [
    { title: "User ID", dataIndex: ["voterId", "_id"], key: "_id" },
    { title: "Full Name", dataIndex: ["voterId", "fullName"], key: "fullName" },
    { title: "Email", dataIndex: ["voterId", "email"], key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex gap-2">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record.voterId._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={voters}
        rowKey={(record) => record.voterId?._id}
      />
      <Modal
        title="Edit Voter"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingVoter(null);
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: "Please enter the full name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter the email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default VoterManagement;
