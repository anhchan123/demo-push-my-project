import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Select, DatePicker, message } from "antd";
import UserService from "../../services/UserService";

interface UserModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  editData?: IUser | null;
}

interface IUser {
  _id: string;
  email: string;
  fullName: string;
  address: {
    province: string;
    district: string;
    ward: string;
  };
  phone: {
    country: string;
    number: string;
  };
  role: string;
  status: string;
  dateOfBirth: string;
  gender: string;
  avatar: string;
}

const UserModal: React.FC<UserModalProps> = ({
  visible,
  onCancel,
  onSuccess,
  editData,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        ...editData,
        phone: {
          country: editData?.phone?.country ?? "+84",
          number: editData?.phone?.number ?? "",
        },
        address: {
          province: editData?.address?.province ?? "",
          district: editData?.address?.district ?? "",
          ward: editData?.address?.ward ?? "",
        },
        dateOfBirth: editData?.dateOfBirth
          ? new Date(editData?.dateOfBirth)
          : null,
      });
    } else {
      form.resetFields();
    }
  }, [editData, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const payload = {
        ...values,
        dateOfBirth: values?.dateOfBirth
          ? values?.dateOfBirth.toISOString()
          : null,
      };

      if (editData) {
        await UserService.editUser(editData?._id, payload);
        message.success("User updated successfully!");
      } else {
        message.success("User created successfully!");
      }

      onSuccess();
      onCancel();
      form.resetFields();
    } catch (error) {
      console.error("Failed to submit form:", error);
      message.error("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={editData ? "Edit User" : "Create User"}
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      destroyOnClose={true}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          fullName: "",
          email: "",
          phone: {
            country: "+84",
            number: "",
          },
          address: {
            province: "",
            district: "",
            ward: "",
          },
          role: "USER",
          status: "ACTIVE",
          dateOfBirth: null,
          gender: "Male",
        }}
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter the full name" }]}
        >
          <Input placeholder="Enter full name" style={{ height: 40 }} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input placeholder="Enter email" style={{ height: 40 }} />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name={["phone", "number"]}
          rules={[{ required: true, message: "Please enter the phone number" }]}
        >
          <Input placeholder="Enter phone number" style={{ height: 40 }} />
        </Form.Item>

        <Form.Item label="Province" name={["address", "province"]}>
          <Input placeholder="Enter province" style={{ height: 40 }} />
        </Form.Item>

        <Form.Item label="District" name={["address", "district"]}>
          <Input placeholder="Enter district" style={{ height: 40 }} />
        </Form.Item>

        <Form.Item label="Ward" name={["address", "ward"]}>
          <Input placeholder="Enter ward" style={{ height: 40 }} />
        </Form.Item>

        <Form.Item label="Role" name="role">
          <Select
            options={[
              { label: "Admin", value: "ADMIN" },
              { label: "User", value: "USER" },
            ]}
            style={{ height: 40 }}
          />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select
            options={[
              { label: "Active", value: "ACTIVE" },
              { label: "Inactive", value: "INACTIVE" },
            ]}
            style={{ height: 40 }}
          />
        </Form.Item>

        <Form.Item label="Date of Birth" name="dateOfBirth">
          <DatePicker style={{ width: "100%", height: 40 }} />
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Select
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
              { label: "Other", value: "Other" },
            ]}
            style={{ height: 40 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
