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
import CategoryService from "../../services/categoryService";
import CategoryModal from "./CategoryModal";

interface IProduct {
  id: string;
  name: string;
  image: string;
  order: number;
  featured: boolean;
  material: string;
  status: string;
}

const Category: React.FC = () => {
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [filteredData, setFilteredData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editData, setEditData] = useState<IProduct | null>(null);

  const ITEMS_PER_PAGE = 5;

  const fetchCategoryData = async () => {
    setLoading(true);
    try {
      const data = await CategoryService.getAllCategories();
      setProductData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Cannot fetch product data:", error);
      message.error("Failed to fetch product data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setLoading(true);
    try {
      await CategoryService.deleteCategory(id);
      message.success("Product deleted successfully!");
      fetchCategoryData();
    } catch (error) {
      console.error("Failed to delete product:", error);
      message.error("Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteProduct = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      content: "Once deleted, this action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => handleDeleteProduct(id),
    });
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
  };

  const handleEditProduct = (product: IProduct) => {
    setEditData(product);
    setModalVisible(true);
  };

  const handleCreateCategory = () => {
    setEditData(null);
    setModalVisible(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = productData.filter((product) =>
      product.name.toLowerCase().includes(value)
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
    fetchCategoryData();
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img src={image} alt="Product" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      sorter: (a: IProduct, b: IProduct) => a.order - b.order,
    },
    {
      title: "Featured",
      dataIndex: "featured",
      key: "featured",
      render: (featured: boolean) => (featured ? "Yes" : "No"),
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: IProduct) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditProduct(record)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => confirmDeleteProduct(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={3}>Category List</Typography.Title>

      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Search by name"
            value={searchText}
            onChange={handleSearch}
            allowClear
          />
        </Col>
        <Col>
          <Button type="primary" onClick={handleCreateCategory}>
            Create Category
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

      <CategoryModal
        visible={modalVisible}
        fetchCategoryData={fetchCategoryData}
        onCancel={handleModalClose}
        onSuccess={handleModalSuccess}
        editData={editData}
      />
    </div>
  );
};

export default Category;
