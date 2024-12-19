import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://128.199.116.4:8200";

const getToken = (): string | null => sessionStorage.getItem("access_token");

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});

class BlogDetailsService {
  static async getAllBlogDetails(): Promise<any> {
    try {
      const response = await axios.get(
        `${BASE_URL}/blog-details`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error in getAllBlogDetails:", error);
      throw error;
    }
  }

  static async createBlogDetail(data: Record<string, any>): Promise<any> {
    try {
      const response = await axios.post(
        `${BASE_URL}/blog-details`,
        data,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error in createBlogDetail:", error);
      throw error;
    }
  }

  static async updateBlogDetail(id: string, data: Record<string, any>): Promise<any> {
    try {
      const response = await axios.put(
        `${BASE_URL}/blog-details/${id}`,
        data,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error in updateBlogDetail:", error);
      throw error;
    }
  }

  static async deleteBlogDetail(id: string): Promise<any> {
    try {
      const response = await axios.delete(
        `${BASE_URL}/blog-details/${id}`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error in deleteBlogDetail:", error);
      throw error;
    }
  }
}

export default BlogDetailsService;
