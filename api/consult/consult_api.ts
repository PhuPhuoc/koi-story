import axios from "axios";

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

export const fetchPostConsult = async (): Promise<PostConsultResponse | ErrorResponse> => {
  try {
    const response = await axios.get<PostConsultResponse>(
      "http://api.koistory.site/api/v1/post-consult"
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: error.response.status,
        error: error.response.data.error || "Failed to fetch post consult data.",
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
