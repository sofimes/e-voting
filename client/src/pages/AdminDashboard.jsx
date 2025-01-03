import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
  BarChartOutlined,
  UserOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => setCollapsed(!collapsed);

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={handleCollapse}
        className="bg-gray-900 text-white"
      >
        <div className="text-white text-center py-4 text-lg font-bold">
          Admin Panel
        </div>
        <Menu theme="dark" mode="inline" className="bg-gray-900">
          <Menu.Item key="1" icon={<BarChartOutlined />}>
            <Link to="/admin-dashboard/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/admin-dashboard/voter-management">Voter Management</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<PieChartOutlined />}>
            <Link to="/admin-dashboard/nominee-management">
              Nominee Management
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<PieChartOutlined />}>
            <Link to="/admin-dashboard/add-nominee">Add Nominee</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="bg-white shadow-md px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <Link
              to="/logout"
              className="hover:text-white text-sm px-5 py-2 rounded-md text-black  transition duration-300 hover:bg-accentcolor"
            ></Link>
          </div>
        </Header>
        <Content className="p-6 bg-gray-100">
          {" "}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
