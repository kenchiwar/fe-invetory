"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { Table, Button, Space, message, Input, Modal, Form, InputNumber, Skeleton, Card, Row, Col } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ClearOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined
} from "@ant-design/icons";
import type { TablePaginationConfig, ColumnsType } from "antd/es/table";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  fetchCurrentStocks,
  fetchCurrentStockById,
  saveCurrentStock,
  deleteCurrentStock,
  setSelectedCurrentStock
} from "@/redux/reducers/currentStockReducer";
import type { CurrentStock, CurrentStockDto } from "@/api/current-stock-service";
import currentStockService from "@/api/current-stock-service";
import { SortDirection } from "@/api/query-builder";

interface SortState {
  field: string
  direction: SortDirection
}

const CurrentStockPage: React.FC = () => {
  // Redux hooks
  const dispatch = useAppDispatch();
  const {
    brandList: currentStocks,
    selectedBrand: selectedCurrentStock,
    error
  } = useAppSelector((state) => state.currentStocks);
  const { status: loadingStatus, entityType } = useAppSelector((state) => state.loading);

  const isLoading = entityType === "currentStock" && loadingStatus !== "None";

  // Local state
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [sort, setSort] = useState<SortState>({
    field: "id",
    direction: SortDirection.ASC
  });
  const [pagination, setPagination] = useState<{
    current: number
    pageSize: number
  }>({
    current: 1,
    pageSize: 10
  });

  // Form instance
  const [form] = Form.useForm<CurrentStockDto>();

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Show error messages
  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  // Fetch current stocks data
  const fetchData = useCallback(async (): Promise<void> => {
    try {
      await dispatch(fetchCurrentStocks()).unwrap();
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch current stocks");
    }
  }, [dispatch]);

  // Refresh data
  const handleRefresh = useCallback((): void => {
    fetchData();
    message.success("Data refreshed from server");
  }, [fetchData]);

  // Clear cache
  const handleClearCache = useCallback((): void => {
    currentStockService.clearCurrentStockCache();
    message.success("Cache cleared");
  }, []);

  // Handle search input change
  const handleSearch = useCallback((value: string): void => {
    setSearchText(value);
  }, []);

  // Handle sorting
  const handleSort = useCallback((field: string): void => {
    setSort((prevSort) => {
      if (prevSort.field === field) {
        // Toggle direction if same field
        return {
          ...prevSort,
          direction: prevSort.direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC
        };
      } else {
        // Set new field and default to ASC
        return {
          field,
          direction: SortDirection.ASC
        };
      }
    });
  }, []);

  // Show add modal
  const showAddModal = useCallback((): void => {
    form.resetFields();
    setIsEditing(false);
    dispatch(setSelectedCurrentStock(null));
    setIsModalVisible(true);
  }, [dispatch, form]);

  // Show edit modal
  const showEditModal = useCallback(
    async (id: number): Promise<void> => {
      try {
        // Fetch the current stock data
        await dispatch(fetchCurrentStockById(id)).unwrap();
        setIsEditing(true);
        setIsModalVisible(true);

        // The form will be populated in the useEffect below
      } catch (error) {
        console.error("Failed to fetch current stock:", error);
        message.error("Failed to fetch current stock details");
      }
    },
    [dispatch]
  );

  // Update form when selected current stock changes
  useEffect(() => {
    if (selectedCurrentStock && isModalVisible && isEditing) {
      form.setFieldsValue({
        id: selectedCurrentStock.id,
        productID: selectedCurrentStock.productID,
        productVariantID: selectedCurrentStock.productVariantID,
        uoMID: selectedCurrentStock.uoMID,
        quantity: selectedCurrentStock.quantity,
        warehouseID: selectedCurrentStock.warehouseID,
        storageBinID: selectedCurrentStock.storageBinID
      });
    }
  }, [selectedCurrentStock, form, isModalVisible, isEditing]);

  // Handle modal cancel
  const handleCancel = useCallback((): void => {
    setIsModalVisible(false);
    dispatch(setSelectedCurrentStock(null));
  }, [dispatch]);

  // Handle form submission
  const handleSubmit = useCallback(async (): Promise<void> => {
    try {
      const values = await form.validateFields();

      // Use the save action
      await dispatch(saveCurrentStock(values as CurrentStock)).unwrap();

      message.success(`Current stock ${isEditing ? "updated" : "created"} successfully`);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to save current stock:", error);
      message.error("Failed to save current stock");
    }
  }, [dispatch, form, isEditing]);

  // Handle current stock deletion
  const handleDelete = useCallback(
    (id: number): void => {
      Modal.confirm({
        title: "Are you sure you want to delete this current stock?",
        content: "This action cannot be undone.",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: async () => {
          try {
            await dispatch(deleteCurrentStock(id)).unwrap();
            message.success("Current stock deleted successfully");
          } catch (error) {
            console.error("Failed to delete current stock:", error);
            message.error("Failed to delete current stock");
          }
        }
      });
    },
    [dispatch]
  );

  // Handle table pagination change
  const handleTableChange = useCallback((tablePagination: TablePaginationConfig): void => {
    setPagination({
      current: tablePagination.current || 1,
      pageSize: tablePagination.pageSize || 10
    });
  }, []);

  // Filter current stocks based on search text (searching in product ID)
  const filteredCurrentStocks =
    currentStocks?.filter((stock) => {
      return stock.productID.toString().includes(searchText);
    }) || [];

  // Sort current stocks based on current sort settings
  const sortedCurrentStocks = [...filteredCurrentStocks].sort((a, b) => {
    const aValue = a[sort.field as keyof CurrentStock];
    const bValue = b[sort.field as keyof CurrentStock];

    // Handle string comparisons
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sort.direction === SortDirection.ASC ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    // Handle null values
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return sort.direction === SortDirection.ASC ? 1 : -1;
    if (bValue == null) return sort.direction === SortDirection.ASC ? -1 : 1;

    // Handle numeric comparisons (this was missing)
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sort.direction === SortDirection.ASC ? aValue - bValue : bValue - aValue;
    }

    // // Handle date comparisons
    // if (aValue as any instanceof Date && bValue as any instanceof Date) {
    //   return sort.direction === SortDirection.ASC
    //     ? aValue.getTime() - bValue.getTime()
    //     : bValue.getTime() - aValue.getTime()
    // }

    // Default case
    return 0;
  });

  // Table columns configuration
  const columns: ColumnsType<CurrentStock> = [
    {
      title: (
        <div className="tw:flex tw:items-center tw:gap-1">
          ID
          <Button
            type="text"
            size="small"
            icon={
              sort.field === "id" ? (
                sort.direction === SortDirection.ASC ? (
                  <SortAscendingOutlined />
                ) : (
                  <SortDescendingOutlined />
                )
              ) : (
                <SortAscendingOutlined />
              )
            }
            onClick={() => handleSort("id")}
          />
        </div>
      ),
      dataIndex: "id",
      key: "id"
    },
    {
      title: (
        <div className="tw:flex tw:items-center tw:gap-1">
          Product ID
          <Button
            type="text"
            size="small"
            icon={
              sort.field === "productID" ? (
                sort.direction === SortDirection.ASC ? (
                  <SortAscendingOutlined />
                ) : (
                  <SortDescendingOutlined />
                )
              ) : (
                <SortAscendingOutlined />
              )
            }
            onClick={() => handleSort("productID")}
          />
        </div>
      ),
      dataIndex: "productID",
      key: "productID"
    },
    {
      title: "Product Variant ID",
      dataIndex: "productVariantID",
      key: "productVariantID",
      render: (text) => text || "N/A"
    },
    {
      title: "UoM ID",
      dataIndex: "uoMID",
      key: "uoMID"
    },
    {
      title: (
        <div className="tw:flex tw:items-center tw:gap-1">
          Quantity
          <Button
            type="text"
            size="small"
            icon={
              sort.field === "quantity" ? (
                sort.direction === SortDirection.ASC ? (
                  <SortAscendingOutlined />
                ) : (
                  <SortDescendingOutlined />
                )
              ) : (
                <SortAscendingOutlined />
              )
            }
            onClick={() => handleSort("quantity")}
          />
        </div>
      ),
      dataIndex: "quantity",
      key: "quantity"
    },
    {
      title: "Warehouse ID",
      dataIndex: "warehouseID",
      key: "warehouseID"
    },
    {
      title: "Storage Bin ID",
      dataIndex: "storageBinID",
      key: "storageBinID",
      render: (text) => text || "N/A"
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text: string) => new Date(text).toLocaleString()
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: CurrentStock) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record.id)}
            loading={loadingStatus === "Get" && selectedCurrentStock?.id === record.id}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            loading={loadingStatus === "Delete" && selectedCurrentStock?.id === record.id}
          >
            Delete
          </Button>
        </Space>
      )
    }
  ];

  // Render skeleton when loading all data
  const renderSkeleton = (): JSX.Element => (
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
  );

  return (
    <div className="tw:p-6">
      <div className="tw:flex tw:justify-between tw:items-center tw:mb-6">
        <h1 className="tw:text-2xl tw:font-bold">Current Stock Management</h1>
        <Space>
          <Input
            placeholder="Search by Product ID"
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
            loading={loadingStatus === "Save" && !selectedCurrentStock}
            disabled={loadingStatus === "All"}
          >
            Add Current Stock
          </Button>
          <Button icon={<ReloadOutlined />} onClick={handleRefresh} loading={loadingStatus === "All"}>
            Refresh
          </Button>
          <Button icon={<ClearOutlined />} onClick={handleClearCache} danger disabled={isLoading}>
            Clear Cache
          </Button>
        </Space>
      </div>

      <div className="tw:bg-white tw:p-6 tw:rounded-lg tw:shadow-md">
        {loadingStatus === "All" ? (
          renderSkeleton()
        ) : (
          <Table
            columns={columns}
            dataSource={sortedCurrentStocks}
            rowKey="id"
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} current stocks`
            }}
            className="tw:w-full"
            loading={loadingStatus === "Get" && !selectedCurrentStock}
            onChange={handleTableChange}
            scroll={{ x: 1200 }}
          />
        )}
      </div>

      {/* Current Stock Form Modal */}
      <Modal
        title={isEditing ? "Edit Current Stock" : "Add Current Stock"}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={isEditing ? "Update" : "Create"}
        confirmLoading={loadingStatus === "Save"}
        width={700}
      >
        <Form form={form} layout="vertical" className="tw:mt-4">
          {isEditing && (
            <Form.Item name="id" hidden>
              <InputNumber />
            </Form.Item>
          )}

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="productID"
                label="Product ID"
                rules={[{ required: true, message: "Please enter Product ID" }]}
              >
                <InputNumber style={{ width: "100%" }} min={1} placeholder="Enter Product ID" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="productVariantID" label="Product Variant ID">
                <InputNumber style={{ width: "100%" }} min={1} placeholder="Enter Product Variant ID (Optional)" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="uoMID" label="UoM ID" rules={[{ required: true, message: "Please enter UoM ID" }]}>
                <InputNumber style={{ width: "100%" }} min={1} placeholder="Enter UoM ID" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[{ required: true, message: "Please enter Quantity" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  step={0.000001}
                  precision={6}
                  placeholder="Enter Quantity"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="warehouseID"
                label="Warehouse ID"
                rules={[{ required: true, message: "Please enter Warehouse ID" }]}
              >
                <InputNumber style={{ width: "100%" }} min={1} placeholder="Enter Warehouse ID" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="storageBinID" label="Storage Bin ID">
                <InputNumber style={{ width: "100%" }} min={1} placeholder="Enter Storage Bin ID (Optional)" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default CurrentStockPage;



