import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

const UserInfoPage = () => {

    const handleLogOut = () => {
        while (router.canGoBack()) {
            router.back();
        }
        router.replace("/");
    }

    return (
        <View>
            <Text>UserInfoPage</Text>
            <Button title='Logout' onPress={handleLogOut}></Button>
        </View>
    )
}

export default UserInfoPage
