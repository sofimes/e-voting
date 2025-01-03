import { Card, Statistic } from "antd";

const Dashboard = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Card title="Total Voters" hoverable>
      <Statistic value={1234} />
    </Card>
    <Card title="Active Elections" hoverable>
      <Statistic value={5} />
    </Card>
    <Card title="Votes Cast" hoverable>
      <Statistic value={567} />
    </Card>
  </div>
);

export default Dashboard;
