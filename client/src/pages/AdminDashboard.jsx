import React, { useState } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
  BarChartOutlined,
  UserOutlined,
  PieChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import HeaderPart from "../common/HeaderPart";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleCollapse = () => setCollapsed(!collapsed);
  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  return (
    <>
      <HeaderPart />
      <Layout className="lg:mt-16 pt-1 mt-11">
        {/* Sidebar for larger screens */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={handleCollapse}
          className="hidden lg:block bg-gray-900 text-white"
          breakpoint="lg"
          collapsedWidth="80"
        >
          <div className="text-white text-center py-4 text-lg font-bold">
            Admin Panel
          </div>
          <Menu theme="dark" mode="inline" className="bg-gray-900">
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/admin-dashboard/voter-management">
                Voter Management
              </Link>
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

        {/* Drawer for smaller screens */}
        <Drawer
          title="Admin Panel"
          placement="left"
          onClose={toggleDrawer}
          visible={drawerVisible}
          className="lg:hidden"
        >
          <Menu theme="dark" mode="vertical">
            <Menu.Item key="1" icon={<BarChartOutlined />}>
              <Link to="/admin-dashboard/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/admin-dashboard/voter-management">
                Voter Management
              </Link>
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
        </Drawer>

        <Layout>
          <Header className="bg-white shadow-md px-6 pt-4 flex items-center justify-between">
            {/* Menu button for smaller screens */}
            <Button
              type="text"
              icon={
                drawerVisible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
              }
              onClick={toggleDrawer}
              className="lg:hidden"
            />

            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <Link
              to="#"
              // className="hover:text-white text-sm px-5 py-2 rounded-md text-black transition duration-300 hover:bg-accentcolor"
            >
              {/* Logout */}
            </Link>
          </Header>
          <Content className="p-6 bg-gray-100">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminLayout;
