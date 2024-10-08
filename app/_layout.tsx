import { Stack } from 'expo-router/stack';

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
    return <MainLayoutStack />
};

export default Layout;
