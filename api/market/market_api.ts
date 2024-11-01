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
export interface MarketDataList {
  post_id: string;
  product_name: string;
  price: number;
  product_type: string;
  image_url: string;
}
export interface CreateMarket {
  color: string;
  description: string;
  price: number;
  origin: string;
  product_name: string;
  product_type: string;
  user_id: string;
  listImageUrls: string[];
}
export interface UpdateMarket{
  color: string;
  description: string;
  price: number;
  origin: string;
  product_name: string;
  product_type: string;
}
export interface MyMarketData {
  post_id: string;
  product_name: string;
  price: number;
  product_type: string;
  image_url: string;
}
export interface ImageData {
  image_url: string;
}



interface ApiResponse {
  status: number;
  message: string;
  data: MarketData;
}
interface ApiResponseGetMarket {
  status: number;
  message: string;
  data: MarketDataList[];
}
interface ApiResponseCreateMarket {
  status: number;
  message: string;
  data: CreateMarket;
}
interface ApiResponseUpdateMarket {
  status: number;
  message: string;
  data: UpdateMarket;
}
interface ApiResponseMyMarket {
  status: number;
  message: string;
  data: MyMarketData[];
}

interface ApiResponseImage {
  status: number;
  message: string;
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

export const getMarket = async (): Promise<ApiResponseGetMarket | string> => {
  try {
    const response = await axios.get<ApiResponseGetMarket>(
      `${API_URL}/post-market`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching market data:", error);
    return "Error fetching market data";
  }
};

export const createMarket = async (data: CreateMarket): Promise<ApiResponseCreateMarket | string> => {
  try {
    const response = await axios.post<ApiResponseCreateMarket>(
      `${API_URL}/post-market`,
      data
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      const message = data.error || "An error occurred while creating the market post.";
      
      const errorDetails = `${message}`;
      return errorDetails;
    } else {
      console.error("Unexpected error:", error);
      return "Unexpected error occurred while creating the market post.";
    }
  }
};

export const updateMarket = async (data: UpdateMarket, id: string): Promise<ApiResponseUpdateMarket | string> => {
  try {
    const response = await axios.put<ApiResponseUpdateMarket>(
      `${API_URL}/post-market/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating market data:", error);
    return "Error updating market data";
  }
};

export const getMyMarket = async (user_id: string): Promise<ApiResponseMyMarket|string> => {
  try {
    const response = await axios.get(`${API_URL}/post-market/user/${user_id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting market data:", error);
    return "Error deleting market data";
  }
};

export const sendImage = async (id: string ,data: ImageData): Promise<ApiResponseImage | string> => {
  try {
    const response = await axios.post<ApiResponseImage>(
      `${API_URL}/posts/${id}/images`,
      data
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      const message = data.error || "An error occurred while creating the market post.";
      
      const errorDetails = `${message}`;
      return errorDetails;
    } else {
      console.error("Unexpected error:", error);
      return "Unexpected error occurred while creating the market post.";
    }
  }
};

export const deleteImage = async (id: string): Promise<ApiResponseImage | string> => {
  try {
    const response = await axios.delete<ApiResponseImage>(
      `${API_URL}/images/${id}`,
{}
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      const message = data.error || "An error occurred while creating the market post.";
      
      const errorDetails = `${message}`;
      return errorDetails;
    } else {
      console.error("Unexpected error:", error);
      return "Unexpected error occurred while creating the market post.";
    }
  }
};







