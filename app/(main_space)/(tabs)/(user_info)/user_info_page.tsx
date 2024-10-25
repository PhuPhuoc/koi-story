import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import UserProfileScreen from '../../../../components/user_profile/user_profile';

const UserInfoPage = () => {

    const handleLogOut = () => {
        while (router.canGoBack()) {
            router.back();
        }
        router.replace("/");
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <UserProfileScreen />
            </View>
            <View style={{ padding: 20, marginBottom: 90 }}>
                <Button title='Logout' onPress={handleLogOut}></Button>
            </View>
        </View>
    )
}

export default UserInfoPage
