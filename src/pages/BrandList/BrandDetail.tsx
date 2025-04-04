"use client"

import type React from "react"

import { useParams, useNavigate } from "react-router-dom"
import { Card, Typography, Descriptions, Button, Space, Skeleton, Tag, Divider } from "antd"
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react"

const { Title, Text } = Typography

type BrandDetailProps = {}

const BrandDetail: React.FC<BrandDetailProps> = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Mock brand data
  const brandData = {
    id: Number.parseInt(id || "0"),
    brandCode: `BRD-${id}`,
    brandName: `Brand ${id}`,
    createdBy: "Admin User",
    createdDate: new Date().toISOString(),
    updatedBy: "Admin User",
    updatedDate: new Date().toISOString(),
    status: "Active",
    description:
      "This is a detailed description of the brand. It includes information about the brand's history, products, and market position.",
    category: "Electronics",
    website: "https://example.com",
    contactEmail: "contact@example.com",
    contactPhone: "+1 (555) 123-4567",
  }

  const handleBack = () => {
    navigate("/Brand")
  }

  const handleEdit = () => {
    navigate(`/Brand/${id}/edit`)
  }

  const handleDelete = () => {
    // Show confirmation dialog in a real app
    alert(`Delete brand with ID: ${id}`)
    navigate("/Brand")
  }

  return (
    <div className="tw:p-4">
      <div className="tw:flex tw:justify-between tw:items-center tw:mb-6">
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
            Back to Brands
          </Button>
          <Title level={2} className="tw:m-0">
            {loading ? <Skeleton.Input style={{ width: 200 }} active /> : `Brand Details: ${brandData.brandName}`}
          </Title>
        </Space>
        <Space>
          <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
            Edit
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>
            Delete
          </Button>
        </Space>
      </div>

      <Card loading={loading}>
        <Descriptions title="Brand Information" bordered column={{ xs: 1, sm: 2, md: 3 }}>
          <Descriptions.Item label="ID">{brandData.id}</Descriptions.Item>
          <Descriptions.Item label="Brand Code">{brandData.brandCode}</Descriptions.Item>
          <Descriptions.Item label="Brand Name">{brandData.brandName}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color="green">{brandData.status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Category">{brandData.category}</Descriptions.Item>
          <Descriptions.Item label="Website">
            <a href={brandData.website} target="_blank" rel="noopener noreferrer">
              {brandData.website}
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="Contact Email">{brandData.contactEmail}</Descriptions.Item>
          <Descriptions.Item label="Contact Phone">{brandData.contactPhone}</Descriptions.Item>
          <Descriptions.Item label="Description" span={3}>
            {brandData.description}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions title="Audit Information" bordered column={{ xs: 1, sm: 2 }}>
          <Descriptions.Item label="Created By">{brandData.createdBy}</Descriptions.Item>
          <Descriptions.Item label="Created Date">{new Date(brandData.createdDate).toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="Updated By">{brandData.updatedBy}</Descriptions.Item>
          <Descriptions.Item label="Updated Date">{new Date(brandData.updatedDate).toLocaleString()}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  )
}

export default BrandDetail

