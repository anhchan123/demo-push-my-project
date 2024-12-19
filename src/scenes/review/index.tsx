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
} from "antd";
import ReviewService from "../../services/ReviewService";

interface IReview {
  _id: string;
  productId: string;
  userId: string;
  reviewText: string;
  rating: number;
  reply: string[];
  createdAt: string;
  updatedAt: string;
}

const Reviews: React.FC = () => {
  const [reviewData, setReviewData] = useState<IReview[]>([]);
  const [filteredData, setFilteredData] = useState<IReview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<IReview | null>(null);

  const ITEMS_PER_PAGE = 5;

  const fetchReviewData = async () => {
    setLoading(true);
    try {
      const data = await ReviewService.getAllReviews();
      setReviewData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Cannot fetch review data:", error);
      message.error("Failed to fetch review data.");
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
    const filtered = reviewData.filter((review) =>
      review.reviewText.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleViewDetails = (review: IReview) => {
    setSelectedReview(review);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedReview(null);
  };

  const columns = [
    {
      title: "Review Text",
      dataIndex: "reviewText",
      key: "reviewText",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => `${rating} ⭐️`,
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string) => new Date(updatedAt).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: IReview) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleViewDetails(record)}>
            Details
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchReviewData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={3}>Review List</Typography.Title>

      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Search by review text"
            value={searchText}
            onChange={handleSearch}
            allowClear
          />
        </Col>
      </Row>

      <Table
        rowKey="_id"
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
        title="Review Details"
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" type="primary" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedReview && (
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Typography.Text strong>Review ID:</Typography.Text>
                <Typography.Paragraph>
                  {selectedReview._id}
                </Typography.Paragraph>
              </Col>

              <Col span={12}>
                <Typography.Text strong>Product ID:</Typography.Text>
                <Typography.Paragraph>
                  {selectedReview.productId}
                </Typography.Paragraph>
              </Col>

              <Col span={12}>
                <Typography.Text strong>User ID:</Typography.Text>
                <Typography.Paragraph>
                  {selectedReview.userId}
                </Typography.Paragraph>
              </Col>

              <Col span={12}>
                <Typography.Text strong>Rating:</Typography.Text>
                <Typography.Paragraph>
                  {selectedReview.rating} ⭐️
                </Typography.Paragraph>
              </Col>

              <Col span={24}>
                <Typography.Text strong>Review Text:</Typography.Text>
                <Typography.Paragraph>
                  {selectedReview.reviewText}
                </Typography.Paragraph>
              </Col>

              <Col span={24}>
                <Typography.Text strong>Replies:</Typography.Text>
                <Typography.Paragraph>
                  {selectedReview.reply.length > 0
                    ? selectedReview.reply.join(", ")
                    : "No replies"}
                </Typography.Paragraph>
              </Col>

              <Col span={12}>
                <Typography.Text strong>Created At:</Typography.Text>
                <Typography.Paragraph>
                  {new Date(selectedReview.createdAt).toLocaleString()}
                </Typography.Paragraph>
              </Col>

              <Col span={12}>
                <Typography.Text strong>Updated At:</Typography.Text>
                <Typography.Paragraph>
                  {new Date(selectedReview.updatedAt).toLocaleString()}
                </Typography.Paragraph>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Reviews;
