import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://128.199.116.4:8200";

const getToken = (): string | null => sessionStorage.getItem("access_token");

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "multipart/form-data",
  },
});

class ProductService {
  static async getAllProducts(): Promise<any> {
    try {
      const response = await axios.get(
        `${BASE_URL}/products`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error in getAllProducts:", error);
      throw error;
    }
  }

  static async createProduct(formData: FormData): Promise<any> {
    try {
      const response = await axios.post(
        `${BASE_URL}/products`,
        formData,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error in createProduct:", error);
      throw error;
    }
  }

  static async updateProduct(id: string, formData: FormData): Promise<any> {
    try {
      const response = await axios.put(
        `${BASE_URL}/products/${id}`,
        formData,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error in updateProduct:", error);
      throw error;
    }
  }

  static async deleteProduct(id: string): Promise<any> {
    try {
      const response = await axios.delete(
        `${BASE_URL}/products/${id}`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error in deleteProduct:", error);
      throw error;
    }
  }
}

export default ProductService;
