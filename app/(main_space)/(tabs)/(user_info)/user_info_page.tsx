import { View, Text, Button, ScrollView } from "react-native";
import React from "react";
import UserProfileScreen from "../../../../components/user_profile/user_profile";

const UserInfoPage = () => {
  return (
    <View style={{ flex: 1 }}>
      <UserProfileScreen />
    </View>
  );
};

export default UserInfoPage;
