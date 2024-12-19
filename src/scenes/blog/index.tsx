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
import BlogDetailsService from "../../services/BlogDetailsService";

interface IBlog {
  id: string;
  title: string;
  image: string;
  content: string;
  author: string;
  commentcount: number;
  createdAt: string;
  updatedAt: string;
  comments: IComment[];
}

interface IComment {
  id: string;
  name: string;
  email: string;
  phone: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

const Blog: React.FC = () => {
  const [blogData, setBlogData] = useState<IBlog[]>([]);
  const [filteredData, setFilteredData] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editData, setEditData] = useState<IBlog | null>(null);

  const ITEMS_PER_PAGE = 5;

  const fetchBlogData = async () => {
    setLoading(true);
    try {
      const data = await BlogDetailsService.getAllBlogDetails();
      setBlogData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Cannot fetch blog data:", error);
      message.error("Failed to fetch blog data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    setLoading(true);
    try {
      await BlogDetailsService.deleteBlogDetail(id);
      message.success("Blog deleted successfully!");
      fetchBlogData();
    } catch (error) {
      console.error("Failed to delete blog:", error);
      message.error("Failed to delete blog.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteBlog = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this blog?",
      content: "Once deleted, this action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => handleDeleteBlog(id),
    });
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
  };

  const handleEditBlog = (blog: IBlog) => {
    setEditData(blog);
    setModalVisible(true);
  };

  const handleCreateBlog = () => {
    setEditData(null);
    setModalVisible(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = blogData.filter((blog) =>
      blog.title.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditData(null);
  };

  const handleModalSuccess = () => {
    setModalVisible(false);
    fetchBlogData();
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img src={image} alt="Blog" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: (content: string) => content.slice(0, 50) + '...',
    },
    {
      title: "Comments",
      dataIndex: "commentcount",
      key: "commentcount",
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
      render: (_: any, record: IBlog) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditBlog(record)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => confirmDeleteBlog(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={3}>Blog List</Typography.Title>

      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Search by title"
            value={searchText}
            onChange={handleSearch}
            allowClear
          />
        </Col>
        <Col>
          <Button type="primary" onClick={handleCreateBlog}>
            Create Blog
          </Button>
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

      {/* <CategoryModal
        visible={modalVisible}
        fetchCategoryData={fetchCategoryData}
        onCancel={handleModalClose}
        onSuccess={handleModalSuccess}
        editData={editData}
      /> */}
    </div>
  );
};

export default Blog;
