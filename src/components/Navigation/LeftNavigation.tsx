"use client"

import React, { useState, useEffect } from "react"
import { Link, useLocation, useMatches } from "react-router-dom"
import { Menu, Typography } from "antd"
import type { MenuProps } from "antd"
import { HomeOutlined, ReadOutlined, ShoppingOutlined, DatabaseOutlined, AppstoreOutlined } from "@ant-design/icons"
import { WEB_ENPOINT } from "@/routes"

const { Title } = Typography
const { SubMenu, Item } = Menu

interface LeftNavigationProps {
  collapsed: boolean
  mobileView: boolean
}

const LeftNavigation: React.FC<LeftNavigationProps> = React.memo(
  ({ collapsed, mobileView }) => {
    const location = useLocation()
    // Type cast cho handle

    const [openKeys, setOpenKeys] = useState<string[]>([])

    // Update open keys based on current path
    useEffect(() => {
      
      const currentPath = location.pathname
      const newOpenKeys: string[] = []

      if (currentPath.startsWith("/Brand")) {
        newOpenKeys.push("brand")
      }

      if (currentPath.startsWith("/current-stock")) {
        newOpenKeys.push("current-stock")
      }

      if (!collapsed) {
        setOpenKeys(newOpenKeys)
      }
    }, [location.pathname, collapsed])

    // Handle menu open change
    const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
      setOpenKeys(keys as string[])
    }

    // Determine which menu item should be active based on current path
    const getSelectedKeys = (): string[] => {
      const currentPath = location.pathname

      // Check for exact matches
      if (currentPath === WEB_ENPOINT.Home) return ["home"]
      if (currentPath === WEB_ENPOINT.Read) return ["read"]
      if (currentPath === WEB_ENPOINT.Route) return ["route"]
      if (currentPath === WEB_ENPOINT.Brand.index) return ["brand-list"]
      if (currentPath === WEB_ENPOINT.CurrentStock.index) return ["stock-list"]

      // Check for dynamic routes
      if (currentPath.startsWith("/Brand/")) {
        if (currentPath.includes("/create")) return ["brand-create"]
        return ["brand-list"] // Default to list for detail views
      }

      if (currentPath.startsWith("/current-stock/")) {
        if (currentPath.includes("/create")) return ["stock-create"]
        return ["stock-list"] // Default to list for detail views
      }

      return []
    }

    return (
      <div className="tw:flex tw:flex-col tw:h-full">
        <div className="tw:flex tw:justify-center tw:items-center tw:h-16 tw:m-4">
          <Title level={4} style={{ margin: 0, color: "white" }}>
            {collapsed ? "App" : "My App"}
          </Title>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKeys()}
          openKeys={collapsed ? [] : openKeys}
          onOpenChange={onOpenChange}
          style={{ borderRight: 0 }}
        >
          {/* Home */}
          <Item key="home" icon={<HomeOutlined />}>
            <Link to={WEB_ENPOINT.Home}>Home</Link>
          </Item>

          {/* Read */}
          <Item key="read" icon={<ReadOutlined />}>
            <Link to={WEB_ENPOINT.Read}>Read</Link>
          </Item>

          {/* Route */}
          <Item key="route" icon={<AppstoreOutlined />}>
            <Link to={WEB_ENPOINT.Route}>Route</Link>
          </Item>

          {/* Brands */}
          <SubMenu key="brand" icon={<ShoppingOutlined />} title="Brands">
            <Item key="brand-list">
              <Link to={WEB_ENPOINT.Brand.index}>All Brands</Link>
            </Item>
            <Item key="brand-create">
              <Link to={`${WEB_ENPOINT.Brand.index}/create`}>Create Brand</Link>
            </Item>
          </SubMenu>

          {/* Current Stock */}
          <SubMenu key="current-stock" icon={<DatabaseOutlined />} title="Current Stock">
            <Item key="stock-list">
              <Link to={WEB_ENPOINT.CurrentStock.index}>All Stock</Link>
            </Item>
            <Item key="stock-create">
              <Link to={`${WEB_ENPOINT.CurrentStock.index}/create`}>Create Stock</Link>
            </Item>
          </SubMenu>
        </Menu>
      </div>
    )
  },
  (prevProps, nextProps) => {
    // Only re-render if these props change
    return prevProps.collapsed === nextProps.collapsed && prevProps.mobileView === nextProps.mobileView
  },
)

export default LeftNavigation

