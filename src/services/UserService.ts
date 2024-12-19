import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://128.199.116.4:8200";

const getToken = (): string | null => sessionStorage.getItem("access_token");

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});

class UserService {
  static async getAllUsers(): Promise<any> {
    try {
      const response = await axios.get(`${BASE_URL}/users`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      throw error;
    }
  }

  static async editUser(id: string, data: Record<string, any>): Promise<any> {
    try {
      const response = await axios.put(
        `${BASE_URL}/users/${id}`,
        data,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error in editUser:", error);
      throw error;
    }
  }

  static async deleteUser(id: string): Promise<any> {
    try {
      const response = await axios.delete(
        `${BASE_URL}/users/${id}`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error in deleteUser:", error);
      throw error;
    }
  }
}

export default UserService;
