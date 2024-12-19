import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Space,
  message,
  Typography,
  Input,
  Row,
  Col,
  Modal,
  Descriptions,
  Steps,
  Tag,
} from "antd";
import OrderService from "../../services/OrderService";

const { Step } = Steps;

interface IOrderItem {
  id: string;
  productId: string;
  count: number;
  totalPrice: number;
}

interface IOrder {
  id: string;
  userId: string;
  orderItems: IOrderItem[];
  discountId: string | null;
  discountAmount: number;
  totalAmount: number;
  finalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const Order: React.FC = () => {
  const [orderData, setOrderData] = useState<IOrder[]>([]);
  const [filteredData, setFilteredData] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const ITEMS_PER_PAGE = 5;
  const orderStatuses = ["Pending", "Processing", "Completed", "Cancelled"];

  const statusColors: Record<string, string> = {
    Pending: "blue",
    Processing: "orange",
    Completed: "green",
    Cancelled: "red",
  };

  const fetchOrderData = async () => {
    setLoading(true);
    try {
      const data = await OrderService.getAllOrders();
      setOrderData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Cannot fetch order data:", error);
      message.error("Failed to fetch order data.");
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = orderData.filter(
      (order) =>
        order.id.toLowerCase().includes(value) ||
        order.status.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleViewDetails = (order: IOrder) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = async (status: string) => {
    if (!selectedOrder) return;
    try {
      await OrderService.changeOrderStatus(selectedOrder.id, status);
      message.success(`Order status changed to "${status}"`);
      fetchOrderData();
      handleModalClose();
    } catch (error) {
      console.error("Failed to change order status:", error);
      message.error("Failed to change order status.");
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount: number) => `${totalAmount} VNĐ`,
    },
    {
      title: "Final Amount",
      dataIndex: "finalAmount",
      key: "finalAmount",
      render: (finalAmount: number) => `${finalAmount} VNĐ`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={statusColors[status] || "default"}>{status}</Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => new Date(createdAt).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: IOrder) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleViewDetails(record)}>
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  const orderItemsColumns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Quantity",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice: number) => `${totalPrice} VNĐ`,
    },
  ];

  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={3}>Order List</Typography.Title>

      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Search by order ID or status"
            value={searchText}
            onChange={handleSearch}
            allowClear
          />
        </Col>
      </Row>

      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={filteredData.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE
        )}
        pagination={{
          current: currentPage,
          pageSize: ITEMS_PER_PAGE,
          total: filteredData.length,
          onChange: handleTableChange,
        }}
      />

      <Modal
        title="Order Details"
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedOrder && (
          <>
            <Typography.Title level={5} style={{ marginTop: 20 }}>
              Change Order Status
            </Typography.Title>
            <Steps
              current={orderStatuses.indexOf(selectedOrder.status)}
              onChange={(current) => handleStatusChange(orderStatuses[current])}
              direction="horizontal"
              size="small"
            >
              {orderStatuses.map((status) => (
                <Step key={status} title={status} />
              ))}
            </Steps>
            <Descriptions
              title="Order Information"
              bordered
              column={1}
              style={{ marginTop: "20px" }}
            >
              <Descriptions.Item label="Order ID">
                {selectedOrder.id}
              </Descriptions.Item>
              <Descriptions.Item label="User ID">
                {selectedOrder.userId}
              </Descriptions.Item>
              <Descriptions.Item label="Total Amount">
                {selectedOrder.totalAmount} VNĐ
              </Descriptions.Item>
              <Descriptions.Item label="Final Amount">
                {selectedOrder.finalAmount} VNĐ
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={statusColors[selectedOrder.status] || "default"}>
                  {selectedOrder.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Updated At">
                {new Date(selectedOrder.updatedAt).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>

            <Typography.Title level={5} style={{ marginTop: 20 }}>
              Order Items
            </Typography.Title>

            <Table
              rowKey="id"
              dataSource={selectedOrder.orderItems}
              columns={orderItemsColumns}
              pagination={false}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default Order;
