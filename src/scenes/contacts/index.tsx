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
  Tag,
} from "antd";
import UserService from "../../services/UserService";
import UserModal from "./UserModal";

interface IUser {
  _id: string;
  email: string;
  fullName: string;
  role: string;
  status: string;
  phone: {
    country: string;
    number: string;
  };
  address: {
    province: string;
    district: string;
    ward: string;
  };
  gender: string;
  dateOfBirth: string;
  avatar: string;
  deliveryAddress: Array<{
    province: string;
    district: string;
    ward: string;
  }>;
}

const User: React.FC = () => {
  const [userData, setUserData] = useState<IUser[]>([]);
  const [filteredData, setFilteredData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editData, setEditData] = useState<IUser | null>(null);

  const ITEMS_PER_PAGE = 5;

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await UserService.getAllUsers();
      const normalizedData = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setUserData(normalizedData);
      setFilteredData(normalizedData);
    } catch (error) {
      console.error("Cannot fetch user data:", error);
      message.error("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    setLoading(true);
    try {
      await UserService.deleteUser(id);
      message.success("User deleted successfully!");
      fetchUserData();
    } catch (error) {
      console.error("Failed to delete user:", error);
      message.error("Failed to delete user.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteUser = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      content: "Once deleted, this action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => handleDeleteUser(id),
    });
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = userData.filter(
      (user) =>
        user.fullName.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.phone.number.includes(value)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleEditUser = (user: IUser) => {
    setEditData(user);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditData(null);
  };

  const handleModalSuccess = () => {
    setModalVisible(false);
    fetchUserData();
  };

  const roleColors: Record<string, string> = {
    ADMIN: "red",
    USER: "blue",
    MANAGER: "green",
    GUEST: "default",
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) =>
        avatar ? (
          <img
            src={avatar}
            alt="User Avatar"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
        ) : (
          <img
            src={`https://i.pinimg.com/originals/11/b4/04/11b40409f4192832c8a8124e253631d1.gif`}
            alt="Default Avatar"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
        ),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      key: "phone",
      render: (_: any, record: IUser) =>
        `${record.phone.country} ${record.phone.number}`,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={roleColors[role] || "default"}>{role.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: IUser) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditUser(record)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => confirmDeleteUser(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={3}>User List</Typography.Title>

      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Search by name, email or phone"
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

      <UserModal
        visible={modalVisible}
        onCancel={handleModalClose}
        onSuccess={handleModalSuccess}
        editData={editData}
      />
    </div>
  );
};

export default User;
