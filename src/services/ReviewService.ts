import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://128.199.116.4:8200";

const getToken = (): string | null => sessionStorage.getItem("access_token");

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    Accept: "application/json",
  },
});

class ReviewService {
  static async getAllReviews(): Promise<any> {
    try {
      const response = await axios.get(`${BASE_URL}/reviews`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error in getAllReviews:", error);
      throw error;
    }
  }
}

export default ReviewService;
