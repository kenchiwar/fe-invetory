"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Table,
  Button,
  Space,
  message,
  Input,
  Modal,
  Form,
  Input as AntInput,
  Switch,
  Tooltip,
  Skeleton,
  Card,
  Row,
  Col,
} from "antd"
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ClearOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { fetchBrands, saveBrand, deleteBrand, setSelectedBrand } from "@/redux/reducers/brandReducer"
import type { Brand, BrandDto } from "@/api/brand-service"
import brandService from "@/api/brand-service"
import { SortDirection } from "@/api/query-builder"

const BrandListPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { brandList, selectedBrand, error } = useAppSelector((state) => state.brands)
  const { status: loadingStatus, entityType } = useAppSelector((state) => state.loading)

  const isLoading = entityType === "brand" && loadingStatus !== "None"

  const [searchText, setSearchText] = useState<string>("")
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [useCache, setUseCache] = useState<boolean>(true)
  const [sortField, setSortField] = useState<string>("brandName")
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.ASC)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [form] = Form.useForm()

  useEffect(() => {
    fetchData()
  }, [dispatch])

  useEffect(() => {
    if (error) {
      message.error(error)
    }
  }, [error])

  const fetchData = async () => {
    try {
      await dispatch(fetchBrands()).unwrap()
    } catch (error) {
      console.error("Error fetching data:", error)
      message.error("Failed to fetch brands")
    }
  }

  const handleRefresh = () => {
    setUseCache(false)
    fetchData()
    message.success("Data refreshed from server")
  }

  const handleClearCache = () => {
    brandService.clearBrandCache()
    message.success("Cache cleared")
    fetchData()
  }

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const handleSort = (field: string) => {
    if (field === sortField) {
      // Toggle direction if same field
      setSortDirection(sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC)
    } else {
      // Set new field and default to ASC
      setSortField(field)
      setSortDirection(SortDirection.ASC)
    }
  }

  const showAddModal = () => {
    form.resetFields()
    setIsEditing(false)
    dispatch(setSelectedBrand(null))
    setIsModalVisible(true)
  }

  const showEditModal = (brand: Brand) => {
    form.setFieldsValue({
      brandCode: brand.brandCode,
      brandName: brand.brandName,
    })
    setIsEditing(true)
    dispatch(setSelectedBrand(brand))
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    dispatch(setSelectedBrand(null))
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()

      // Prepare the data for saving
      const brandData: BrandDto = {
        ...values,
        ...(isEditing && selectedBrand ? { id: selectedBrand.id } : {}),
      }

      // Use the save action
      await dispatch(saveBrand(brandData)).unwrap()

      message.success(`Brand ${isEditing ? "updated" : "created"} successfully`)
      setIsModalVisible(false)

      // Refresh the data
      fetchData()
    } catch (error) {
      console.error("Failed to save brand:", error)
      message.error("Failed to save brand")
    }
  }

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this brand?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await dispatch(deleteBrand(id)).unwrap()
          message.success("Brand deleted successfully")

          // Refresh the data
          fetchData()
        } catch (error) {
          console.error("Failed to delete brand:", error)
          message.error("Failed to delete brand")
        }
      },
    })
  }

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current)
    setPageSize(pagination.pageSize)
  }

  const filteredBrands = brandList.filter(
    (brand) =>
      brand.brandName.toLowerCase().includes(searchText.toLowerCase()) ||
      brand.brandCode.toLowerCase().includes(searchText.toLowerCase()),
  )

  // Sort brands based on current sort settings
  const sortedBrands = [...filteredBrands].sort((a, b) => {
    const aValue = a[sortField as keyof Brand]
    const bValue = b[sortField as keyof Brand]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === SortDirection.ASC ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    // Default comparison for non-string values
    return sortDirection === SortDirection.ASC ? (aValue > bValue ? 1 : -1) : bValue > aValue ? 1 : -1
  })

  const columns: ColumnsType<Brand> = [
    {
      title: (
        <div className="tw:flex tw:items-center tw:gap-1">
          Brand Code
          <Button
            type="text"
            size="small"
            icon={
              sortField === "brandCode" ? (
                sortDirection === SortDirection.ASC ? (
                  <SortAscendingOutlined />
                ) : (
                  <SortDescendingOutlined />
                )
              ) : (
                <SortAscendingOutlined />
              )
            }
            onClick={() => handleSort("brandCode")}
          />
        </div>
      ),
      dataIndex: "brandCode",
      key: "brandCode",
    },
    {
      title: (
        <div className="tw:flex tw:items-center tw:gap-1">
          Brand Name
          <Button
            type="text"
            size="small"
            icon={
              sortField === "brandName" ? (
                sortDirection === SortDirection.ASC ? (
                  <SortAscendingOutlined />
                ) : (
                  <SortDescendingOutlined />
                )
              ) : (
                <SortAscendingOutlined />
              )
            }
            onClick={() => handleSort("brandName")}
          />
        </div>
      ),
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: (
        <div className="tw:flex tw:items-center tw:gap-1">
          Created Date
          <Button
            type="text"
            size="small"
            icon={
              sortField === "createdDate" ? (
                sortDirection === SortDirection.ASC ? (
                  <SortAscendingOutlined />
                ) : (
                  <SortDescendingOutlined />
                )
              ) : (
                <SortAscendingOutlined />
              )
            }
            onClick={() => handleSort("createdDate")}
          />
        </div>
      ),
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text) => new Date(text).toLocaleString(),
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
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            loading={loadingStatus === "Save" && selectedBrand?.id === record.id}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            loading={loadingStatus === "Delete" && selectedBrand?.id === record.id}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  // Render skeleton when loading all data
  const renderSkeleton = () => (
    <>
      <Skeleton active paragraph={{ rows: 1 }} className="tw:mb-6" />
      <Row gutter={[16, 16]} className="tw:mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Col span={24} key={i}>
            <Card>
              <Skeleton active paragraph={{ rows: 2 }} />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )

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
            disabled={loadingStatus === "All"}
            allowClear
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showAddModal}
            className="tw:bg-green-500 tw:border-green-500 hover:tw:bg-green-600"
            loading={loadingStatus === "Save" && !selectedBrand}
            disabled={loadingStatus === "All"}
          >
            Add Brand
          </Button>
          <Button icon={<ReloadOutlined />} onClick={handleRefresh} loading={loadingStatus === "All"}>
            Refresh
          </Button>
          <Button icon={<ClearOutlined />} onClick={handleClearCache} danger disabled={isLoading}>
            Clear Cache
          </Button>
          <Tooltip title="Toggle cache usage">
            <div className="tw:flex tw:items-center tw:gap-2">
              <span>Use Cache:</span>
              <Switch checked={useCache} onChange={setUseCache} disabled={isLoading} />
            </div>
          </Tooltip>
        </Space>
      </div>

      <div className="tw:bg-white tw:p-6 tw:rounded-lg tw:shadow-md">
        {loadingStatus === "All" ? (
          renderSkeleton()
        ) : (
          <Table
            columns={columns}
            dataSource={sortedBrands}
            rowKey="id"
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} brands`,
              onChange: (page, pageSize) => {
                setCurrentPage(page)
                setPageSize(pageSize || 5)
              },
            }}
            className="tw:w-full"
            loading={loadingStatus === "Get"}
            onChange={handleTableChange}
          />
        )}
      </div>

      {/* Brand Form Modal */}
      <Modal
        title={isEditing ? "Edit Brand" : "Add Brand"}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={isEditing ? "Update" : "Create"}
        confirmLoading={loadingStatus === "Save"}
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

export default BrandListPage

