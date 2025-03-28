"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Table, Button, Space, message, Spin, Input, Modal, Form, Input as AntInput } from "antd"
import { SearchOutlined, ReloadOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import brandService, { type Brand, type CreateBrandDto, type UpdateBrandDto } from "../api/brand-service"

const BrandList: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchText, setSearchText] = useState<string>("")
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null)
  const [form] = Form.useForm()

  const fetchBrands = async () => {
    try {
      setLoading(true)
      const data = await brandService.getAllBrands()
      setBrands(data)
    } catch (error) {
      console.error("Failed to fetch brands:", error)
      message.error("Failed to load brands")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBrands()
  }, [])

  const handleRefresh = () => {
    fetchBrands()
    message.success("Data refreshed")
  }

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const showAddModal = () => {
    form.resetFields()
    setIsEditing(false)
    setCurrentBrand(null)
    setIsModalVisible(true)
  }

  const showEditModal = (brand: Brand) => {
    form.setFieldsValue({
      brandCode: brand.brandCode,
      brandName: brand.brandName,
    })
    setIsEditing(true)
    setCurrentBrand(brand)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()

      if (isEditing && currentBrand) {
        await brandService.updateBrand(currentBrand.id, values as UpdateBrandDto)
        message.success("Brand updated successfully")
      } else {
        await brandService.createBrand(values as CreateBrandDto)
        message.success("Brand created successfully")
      }

      setIsModalVisible(false)
      fetchBrands()
    } catch (error) {
      console.error("Failed to save brand:", error)
      message.error("Failed to save brand")
    }
  }

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this brand?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await brandService.deleteBrand(id)
          message.success("Brand deleted successfully")
          fetchBrands()
        } catch (error) {
          console.error("Failed to delete brand:", error)
          message.error("Failed to delete brand")
        }
      },
    })
  }

  const filteredBrands = brands.filter(
    (brand) =>
      brand.brandName.toLowerCase().includes(searchText.toLowerCase()) ||
      brand.brandCode.toLowerCase().includes(searchText.toLowerCase()),
  )

  const columns: ColumnsType<Brand> = [
    {
      title: "Brand Code",
      dataIndex: "brandCode",
      key: "brandCode",
      sorter: (a, b) => a.brandCode.localeCompare(b.brandCode),
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
      sorter: (a, b) => a.brandName.localeCompare(b.brandName),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
      key: "updatedBy",
    },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
      key: "updatedDate",
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) => new Date(a.updatedDate).getTime() - new Date(b.updatedDate).getTime(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div className="tw:p-6">
      <div className="tw:flex tw:justify-between tw:items-center tw:mb-6">
        <h1 className="tw:text-2xl tw:font-bold">Brand Management</h1>
        <Space>
          <Input
            placeholder="Search brands"
            prefix={<SearchOutlined />}
            onChange={(e) => handleSearch(e.target.value)}
            className="tw:w-64"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showAddModal}
            className="tw:bg-green-500 tw:border-green-500 hover:tw:bg-green-600"
          >
            Add Brand
          </Button>
          <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
            Refresh
          </Button>
        </Space>
      </div>

      <div className="tw:bg-white tw:p-6 tw:rounded-lg tw:shadow-md">
        {loading ? (
          <div className="tw:flex tw:justify-center tw:items-center tw:h-64">
            <Spin size="large" tip="Loading brands..." />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredBrands}
            rowKey="id"
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} brands`,
            }}
            className="tw:w-full"
          />
        )}
      </div>

      <Modal
        title={isEditing ? "Edit Brand" : "Add Brand"}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={isEditing ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical" className="tw:mt-4">
          <Form.Item
            name="brandCode"
            label="Brand Code"
            rules={[{ required: true, message: "Please enter brand code" }]}
          >
            <AntInput placeholder="Enter brand code" />
          </Form.Item>
          <Form.Item
            name="brandName"
            label="Brand Name"
            rules={[{ required: true, message: "Please enter brand name" }]}
          >
            <AntInput placeholder="Enter brand name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default BrandList

