import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Checkbox, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CategoryService from "../../services/categoryService";

interface CategoryModalProps {
  visible: boolean;
  onCancel: () => void;
  fetchCategoryData: () => void;
  onSuccess: () => void;
  editData?: IProduct | null;
}

interface IProduct {
  id: string;
  name: string;
  image: string;
  order: number;
  featured: boolean;
  material: string;
  status: string;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  visible,
  onCancel,
  onSuccess,
  editData,
  fetchCategoryData,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        name: editData.name,
        image: editData.image,
        order: editData.order,
        featured: editData.featured,
        material: editData.material,
        status: editData.status,
      });
      if (editData.image) {
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: editData.image,
          },
        ]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [editData, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      // Nếu có hình ảnh, thêm hình ảnh vào formData
      if (fileList.length > 0) {
        formData.append("image", fileList[0].originFileObj);
      }

      if (editData) {
        // Update existing category
        await CategoryService.updateCategory(editData.id, formData);
        message.success("Category updated successfully!");
      } else {
        // Create new category
        await CategoryService.createCategory(formData);
        message.success("Category created successfully!");
      }

      fetchCategoryData();
      onSuccess();
      onCancel();
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error("Failed to submit form:", error);
      message.error("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  return (
    <Modal
      title={editData ? "Edit Category" : "Create Category"}
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
          name: "",
          order: 1,
          featured: false,
          material: "",
          status: "Active",
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the category name" },
          ]}
        >
          <Input placeholder="Enter category name" style={{ height: 40 }} />
        </Form.Item>

        <Form.Item label="Image" name="image">
          <Upload
            listType="picture"
            maxCount={1}
            fileList={fileList}
            beforeUpload={() => false} // Do not automatically upload
            onChange={handleImageChange}
          >
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Order"
          name="order"
          rules={[{ required: true, message: "Please enter the order" }]}
        >
          <Input
            type="number"
            placeholder="Enter order"
            style={{ height: 40 }}
          />
        </Form.Item>

        <Form.Item
          label="Material"
          name="material"
          rules={[{ required: true, message: "Please enter the material" }]}
        >
          <Input placeholder="Enter material" style={{ height: 40 }} />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please enter the status" }]}
        >
          <Input placeholder="Enter status" style={{ height: 40 }} />
        </Form.Item>

        <Form.Item name="featured" valuePropName="checked">
          <Checkbox>Featured</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
