import { Stack } from 'expo-router/stack';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="(bottom_tab)" options={{ headerShown: false }} />
        </Stack>
    );
}
