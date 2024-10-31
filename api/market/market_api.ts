import axios from "axios";
import { API_URL } from "../../constants/const";

interface MarketImage {
  id: string;
  image_url: string;
}

export interface MarketData {
  id: string;
  product_name: string;
  price: number;
  product_type: string;
  color: string;
  origin: string;
  description: string;
  phone_number: string;
  location: string;
  address: string;
  ListImage: MarketImage[];
}

interface ApiResponse {
  status: number;
  message: string;
  data: MarketData;
}

export const getMarketDetailById = async (id: string): Promise<ApiResponse | string> => {
  try {
    const response = await axios.get<ApiResponse>(
      `${API_URL}/post-market/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching market data:", error);
    return "Error fetching market data";
  }
};
