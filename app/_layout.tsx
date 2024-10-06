import { Stack } from 'expo-router/stack';
import { AuthProvider } from '../context/auth.context';

const MainLayoutStack = () => {
    return (
        <Stack>
            <Stack.Screen
                name="(main_space)/(tabs)"
                options={{ headerShown: false }}
            />
        </Stack>
    );
};

const Layout = () => {
    return (
        <AuthProvider>
            <MainLayoutStack />
        </AuthProvider>
    );
};

export default Layout;
