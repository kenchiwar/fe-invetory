"use client"

import { useState, useEffect, Suspense } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Layout, Menu, Button, Drawer, Space, Typography, Divider, Badge, Dropdown } from "antd"
import {
  HomeOutlined,
  ReadOutlined,
  MenuOutlined,
  BellOutlined,
  ShoppingOutlined,
  MessageOutlined,
  SettingOutlined,
  UserOutlined,
  DatabaseOutlined,
} from "@ant-design/icons"



import Loading from "@components/Loading"


const { Header, Content, Footer } = Layout
const { Text } = Typography

function MainLayout() {
  const [mobileView, setMobileView] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()

  // SignalR hook for notifications
  // const { notifications, getUnreadCount } = useSignalR()

  // Determine which menu item should be active based on current path
  const getSelectedKey = () => {
    const path = location.pathname

    if (path === "/") return ["home"]
    if (path === "/read") return ["read"]
    if (path === "/brands") return ["brands"]
    if (path === "/notifications") return ["notifications"]
    if (path === "/chat") return ["chat"]
    return []
  }

  // Check if we're in mobile view
  useEffect(() => {
    const checkMobile = () => {
      setMobileView(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Menu items configuration
  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "read",
      icon: <ReadOutlined />,
      label: <Link to="/read">Read</Link>,
    },
    {
      key: "brands",
      icon: <ShoppingOutlined />,
      label: <Link to="/BrandList">Brands</Link>,
    },
 
    {
      key: "chat",
      icon: <MessageOutlined />,
      label: <Link to="/chat">Real-time Chat</Link>,
    },
    {
      key: "current-stock",
      icon: <DatabaseOutlined />,
      label: <Link to="/current-stock">Current Stock</Link>,
    }
  ]

  // Toggle drawer for mobile view
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <Layout className="tw:min-h-screen">
      <Helmet>
        <meta name="keywords" content="React, SEO, Helmet, Vite, TypeScript" />
        <meta property="og:title" content="Trang Chủ " />
        <meta property="og:description" content="Trang chủ" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header
        className="tw:flex tw:items-center tw:justify-between"
        style={{ padding: mobileView ? "0 16px" : "0 50px" }}
      >
        <div className="tw:flex tw:items-center">
          <Typography.Title level={4} style={{ margin: 0, color: "white" }}>
            My App
          </Typography.Title>
        </div>

        {mobileView ? (
          <Space>
            {/* <NotificationPopover>
              <Badge count={getUnreadCount()} size="small">
                <Button type="text" icon={<BellOutlined />} style={{ color: "white" }} />
              </Badge>
            </NotificationPopover> */}

            <Button type="text" icon={<MenuOutlined />} onClick={toggleDrawer} style={{ color: "white" }} />
          </Space>
        ) : (
          <div className="tw:flex tw:items-center">
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={getSelectedKey()}
              items={menuItems}
              style={{ minWidth: 280, flex: "auto" }}
            />

            <Space className="tw:ml-4">
           

              <Dropdown
                menu={{
                  items: [
                    {
                      key: "profile",
                      label: <Link to="/profile">Profile</Link>,
                      icon: <UserOutlined />,
                    },
                    {
                      key: "settings",
                      label: <Link to="/settings">Settings</Link>,
                      icon: <SettingOutlined />,
                    },
                    {
                      type: "divider",
                    },
                    {
                      key: "logout",
                      label: "Logout",
                      danger: true,
                    },
                  ],
                }}
                placement="bottomRight"
              >
                <Button type="text" icon={<UserOutlined />} style={{ color: "white" }} />
              </Dropdown>
            </Space>
          </div>
        )}
      </Header>

      {/* Mobile Drawer */}
      <Drawer title="Menu" placement="right" onClose={toggleDrawer} open={drawerOpen} width={250}>
        <Menu mode="vertical" selectedKeys={getSelectedKey()} items={menuItems} style={{ border: "none" }} />

        <Divider />

        <Menu
          mode="vertical"
          style={{ border: "none" }}
          items={[
            {
              key: "profile",
              label: <Link to="/profile">Profile</Link>,
              icon: <UserOutlined />,
            },
            {
              key: "settings",
              label: <Link to="/settings">Settings</Link>,
              icon: <SettingOutlined />,
            },
            {
              type: "divider",
            },
            {
              key: "logout",
              label: "Logout",
              danger: true,
              icon: <UserOutlined />,
            },
          ]}
        />
      </Drawer>

      <Content className="tw:p-4 tw:mx-auto" style={{ maxWidth: 1600 }}>
        <div className="tw:bg-white tw:p-4 tw:min-h-[280px]">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        <Divider />
        <Space direction="vertical" size="small">
          <Typography.Text>© 2025 - My React App 🚀</Typography.Text>
          <Typography.Text type="secondary">Built with React, Vite, and Ant Design</Typography.Text>
        </Space>
      </Footer>

    
    </Layout>
  )
}

export default MainLayout
