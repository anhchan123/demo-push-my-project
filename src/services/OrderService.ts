import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://128.199.116.4:8200";

const getToken = (): string | null => sessionStorage.getItem("access_token");

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});

class OrderService {
  static async getAllOrders(): Promise<any> {
    try {
      const response = await axios.get(`${BASE_URL}/orders`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error in getAllOrders:", error);
      throw error;
    }
  }

  static async changeOrderStatus(id: string, status: string): Promise<any> {
    try {
      const response = await axios.put(
        `${BASE_URL}/orders/${id}/status`,
        { status },
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error in changeOrderStatus:", error);
      throw error;
    }
  }
}

export default OrderService;
