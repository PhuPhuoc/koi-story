import React, { createContext, useState, ReactNode, useContext } from "react";
import { LoginWithEmailPassword } from "../api/authen/auth_api";
import { Alert } from "react-native";
import { router } from "expo-router";

const duumyEmail: string = "tam";
const duumyPass: string = "123";

type UserData = {
  id: string;
  fb_id: string | null;
  email: string;
  user_name: string;
  avatar: string;
  role: string;
} | null;

type AuthContextType = {
  isLoggedIn: boolean;
  userData: UserData;
  loginByExistUser: () => void;
  loginWithEmailPassword: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>(null);

  const loginWithEmailPassword = async (email: string, password: string) => {
    const response = await LoginWithEmailPassword(email, password);
    if ("data" in response) {
      Alert.alert("Login successful:", response.message);
      setUserData(response.data);
      setIsLoggedIn(true);
      router.push("/(tabs)/blog");
    } else {
      Alert.alert("Login error:", response.log);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  // const loginWithEmailPassword = (email: string | null, password: string | null) => {

  // }

  //   const logout = async () => {};
  const loginByExistUser = async () => {
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userData,
        loginByExistUser,
        loginWithEmailPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
