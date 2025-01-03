import { Table, Button } from "antd";
const NomineeManagement = () => {
  const columns = [
    { title: "Nominee ID", dataIndex: "id", key: "id" },
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
    { id: "1", email: "nominee1@example.com" },
    { id: "2", email: "nominee2@example.com" },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default NomineeManagement;
