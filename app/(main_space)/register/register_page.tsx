import { View, Text, Button } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'

const RegisterPage = () => {
    return (
        <View>
            <Stack.Screen options={{ headerTitle: "Register Page" }} />
            <Text>RegisterPage</Text>
            <Button onPress={() => router.push("/(tabs)/blog")} title="Register"></Button>
        </View>
    )
}

export default RegisterPage
