import axios from "axios";
import { API_URL } from "../../constants/const";

interface UserData {
  id: string;
  fb_id: string | null;
  email: string;
  user_name: string;
  avatar: string;
  role: string;
}

export interface SellerRegistrationResponse {
  status: number;
  message: string;
  data?: {
    user_id: string;
    address: string;
    location: string;
    phone_number: string;
  };
}

interface LoginResponse {
  status: number;
  message: string;
  data: UserData;
}

interface ErrorResponse {
  status: number;
  error: string;
  log: string;
}

type AuthResponse = LoginResponse | ErrorResponse;
type RegisterSellerResponse = SellerRegistrationResponse | ErrorResponse;

export const LoginWithEmailPassword = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/users/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: error.response.status,
        error: error.response.data.error || "Login failed.",
        log: error.response.data.log || "No additional logs available.",
      };
    }

    return {
      status: 500,
      error: "Login failed. Please try again.",
      log: "Unexpected error occurred.",
    };
  }
};

export const Register = async (
  email: string,
  password: string,
  name: string,
  confirm_password: string
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/users/register`,
      {
        email,
        password,
        name,
        confirm_password,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: error.response.status,
        error: error.response.data.error || "Registration failed.",
        log: error.response.data.log || "No additional logs available.",
      };
    }

    return {
      status: 500,
      error: "Registration failed. Please try again.",
      log: "Unexpected error occurred.",
    };
  }
};

export const registerSeller = async (
  user_id: string,
  address: string,
  location: string,
  phoneNumber: string
): Promise<RegisterSellerResponse> => {
  try {
    const response = await axios.post<SellerRegistrationResponse>(
      `http://api.koistory.site/api/v1/users/${user_id}/sellers`,
      {
        address,
        location,
        phone_number: phoneNumber,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: error.response.status,
        error: error.response.data.error || "Registration failed.",
        log: error.response.data.log || "No additional logs available.",
      };
    }

    return {
      status: 500,
      error: "Registration failed. Please try again.",
      log: "Unexpected error occurred.",
    };
  }
};

export const getSellers = async (
  user_id: string
): Promise<RegisterSellerResponse> => {
  try {
    const response = await axios.get<SellerRegistrationResponse>(
      `http://api.koistory.site/api/v1/users/${user_id}/sellers`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: error.response.status,
        error: error.response.data.error || "Failed to fetch sellers.",
        log: error.response.data.log || "No additional logs available.",
      };
    }

    return {
      status: 500,
      error: "Failed to fetch sellers. Please try again.",
      log: "Unexpected error occurred.",
    };
  }
};
