import { View, Text, Button } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'

const LoginPage = () => {
    return (
        <View>
            <Stack.Screen options={{ headerTitle: "Login Page" }} />
            <Text>LoginPage</Text>
            <Button onPress={() => router.push("/(tabs)/blog")} title="Login"></Button>
            <Button onPress={() => router.push("/register/register_page")} title="Register"></Button>
        </View>
    )
}
export default LoginPage
