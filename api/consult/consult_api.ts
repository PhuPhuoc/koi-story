import axios from "axios";
import { API_URL } from "../../constants/const";


export interface CreateConsult {
    content: string;
    title: string;
    user_id: string;
    listImageUrls: string[];
  }

  interface ApiResponseCreateConsult {
    status: number;
    message: string;
    data: CreateConsult;
  }

export const createConsult = async (data: CreateConsult): Promise<ApiResponseCreateConsult | string> => {
    try {
      const response = await axios.post<ApiResponseCreateConsult>(
        `${API_URL}/post-consult`,
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