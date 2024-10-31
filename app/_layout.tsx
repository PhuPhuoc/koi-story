import { Stack } from "expo-router/stack";
import { AuthProvider } from "../context/auth.context";

const MainLayoutStack = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="(main_space)/(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    </AuthProvider>
  );
};

const Layout = () => {
  return <MainLayoutStack />;
};

export default Layout;
