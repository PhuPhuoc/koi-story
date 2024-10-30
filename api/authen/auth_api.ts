import axios from "axios";

interface UserData {
  id: string;
  fb_id: string | null;
  email: string;
  user_name: string;
  avatar: string;
  role: string;
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

// Union type for possible return values
type AuthResponse = LoginResponse | ErrorResponse;

export const LoginWithEmailPassword = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      "http://api.koistory.site/api/v1/users/login",
      {
        email,
        password,
      }
    );

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
      status: 500, // or another appropriate error code
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
      "http://api.koistory.site/api/v1/users/register",
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

    // General error fallback
    return {
      status: 500, // or another appropriate error code
      error: "Registration failed. Please try again.",
      log: "Unexpected error occurred.",
    };
  }
};
