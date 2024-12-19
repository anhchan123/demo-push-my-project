import React, { useEffect, useState } from "react";
import { Button, Table, Space, message, Typography, Input, Row, Col, Modal } from "antd";
import ProductService from "../../services/productService";

interface IProduct {
  id: string;
  Product_name: string;
  Product_brand: string;
  Product_tag: string;
  Product_sku: string;
  Product_description: string;
  Product_currency: string;
  Product_color: string[];
  Product_size: string[];
  Product_specifications: string;
  Product_price: number;
  Product_count: number;
  Product_images: string[];
  Product_isNewArrival: boolean;
  Product_isBestSeller: boolean;
  Product_isOnSale: boolean;
  categoryId: string;
  userId: string;
  reviews: string[];
  favorite_users: string[];
}

const Products: React.FC = () => {
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [filteredData, setFilteredData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editData, setEditData] = useState<IProduct | null>(null);

  const ITEMS_PER_PAGE = 5;

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const data = await ProductService.getAllProducts();
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
      await ProductService.deleteProduct(id);
      message.success("Product deleted successfully!");
      fetchProductData();
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
      cancelText: "No",
      onOk: () => handleDeleteProduct(id),
    });
  };

  const handleEditProduct = (product: IProduct) => {
    setEditData(product);
    setModalVisible(true);
  };

  const handleCreateProduct = () => {
    setEditData(null);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditData(null);
  };

  const handleModalSuccess = () => {
    setModalVisible(false);
    fetchProductData();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    if (!value) {
      setFilteredData(productData);
    } else {
      const filtered = productData.filter((product) =>
        product.Product_name.toLowerCase().includes(value)
      );
      setFilteredData(filtered);
    }
    setCurrentPage(1);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "Product_images",
      key: "Product_images",
      render: (images: string[]) => (
        <img src={images[0]} alt="Product" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Name",
      dataIndex: "Product_name",
      key: "Product_name",
    },
    {
      title: "Brand",
      dataIndex: "Product_brand",
      key: "Product_brand",
    },
    {
      title: "SKU",
      dataIndex: "Product_sku",
      key: "Product_sku",
    },
    {
      title: "Colors",
      dataIndex: "Product_color",
      key: "Product_color",
      render: (colors: string[]) => colors.join(", "),
    },
    {
      title: "Sizes",
      dataIndex: "Product_size",
      key: "Product_size",
      render: (sizes: string[]) => sizes.join(", "),
    },
    {
      title: "Price",
      dataIndex: "Product_price",
      key: "Product_price",
      render: (price: number, record: IProduct) => `${record.Product_currency} ${price}`,
    },
    {
      title: "Stock",
      dataIndex: "Product_count",
      key: "Product_count",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: IProduct) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditProduct(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => confirmDeleteProduct(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={3}>Product List</Typography.Title>

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
          <Button type="primary" onClick={handleCreateProduct}>
            Create Product
          </Button>
        </Col>
      </Row>

      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={filteredData}
        pagination={{
          current: currentPage,
          pageSize: ITEMS_PER_PAGE,
          total: filteredData.length,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </div>
  );
};

export default Products;
