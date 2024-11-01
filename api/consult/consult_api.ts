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

export const createConsult = async (
  data: CreateConsult
): Promise<ApiResponseCreateConsult | string> => {
  try {
    const response = await axios.post<ApiResponseCreateConsult>(
      `${API_URL}/post-consult`,
      data
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      const message =
        data.error || "An error occurred while creating the market post.";

      const errorDetails = `${message}`;
      return errorDetails;
    } else {
      console.error("Unexpected error:", error);
      return "Unexpected error occurred while creating the market post.";
    }
  }
};

interface ImageData {
  id: string;
  image_url: string;
}

interface PostConsultData {
  post_id: string;
  title: string;
  content: string;
  Images: ImageData[];
  Comments: string | null;
}

interface PostConsultResponse {
  status: number;
  message: string;
  data: PostConsultData[];
}

interface ErrorResponse {
  status: number;
  error: string;
  log: string;
}

export const fetchPostConsult = async (): Promise<
  PostConsultResponse | ErrorResponse
> => {
  try {
    const response = await axios.get<PostConsultResponse>(
      "http://api.koistory.site/api/v1/post-consult"
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: error.response.status,
        error:
          error.response.data.error || "Failed to fetch post consult data.",
        log: error.response.data.log || "No additional logs available.",
      };
    }

    return {
      status: 500,
      error: "Failed to fetch post consult data. Please try again.",
      log: "Unexpected error occurred.",
    };
  }
};
