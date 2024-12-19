import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://128.199.116.4:8200";

const getToken = (): string | null => sessionStorage.getItem("access_token");

const getAuthHeaders = () => ({
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });
  

class CategoryService {
  static async getAllCategories(): Promise<any> {
    try {
      const response = await axios.get(
        `${BASE_URL}/categories`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error in getAllCategories:", error);
      throw error;
    }
  }

  static async createCategory(formData: FormData): Promise<any> {
    try {
      const response = await axios.post(
        `${BASE_URL}/categories`,
        formData,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error in createCategory:", error);
      throw error;
    }
  }

  static async updateCategory(id: string, formData: FormData): Promise<any> {
    try {
      const response = await axios.put(
        `${BASE_URL}/categories/${id}`,
        formData,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error in updateCategory:", error);
      throw error;
    }
  }

  static async deleteCategory(id: string): Promise<any> {
    try {
      const response = await axios.delete(
        `${BASE_URL}/categories/${id}`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error in deleteCategory:", error);
      throw error;
    }
  }
}

export default CategoryService;
