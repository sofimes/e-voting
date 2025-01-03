import { Table, Button } from "antd";
const VoterManagement = () => {
  const columns = [
    { title: "Voter ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <div className="flex gap-2">
          <Button type="link">Edit</Button>
          <Button type="link" danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const data = [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default VoterManagement;
