import axios from "axios";
import { API_URL } from "../../constants/const";


export interface BlogData {
  id: string;
  name: string;
  description: string;
}

interface ApiResponse {
  status: number;
  message: string;
  data: BlogData[];
}

export const getCategory = async (): Promise<ApiResponse | string> => {
  try {
    const response = await axios.get<ApiResponse>(
      `${API_URL}/categories`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching market data:", error);
    return "Error fetching market data";
  }
};
