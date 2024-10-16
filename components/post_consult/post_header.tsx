import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface PostHeaderProps {
  displayName: string;
  profilePicture: string;
  createdAt: string;
  feng_Shui: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ displayName, profilePicture, createdAt, feng_Shui }) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
      <View style={styles.userInfo}>
      <View style={styles.nameContainer}>
          <Text style={styles.displayName}>{displayName}</Text>
          <Text style={styles.fengShui}>*{feng_Shui}</Text>
        </View>
        <Text style={styles.createdAt}>{createdAt}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flexDirection: 'column',
  },
  displayName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  createdAt: {
    color: '#777',
    fontSize: 14,
  },
  fengShui: {
    color: '#777',
    fontSize: 16,
    marginLeft: 5,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PostHeader;
