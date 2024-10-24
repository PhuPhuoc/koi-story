import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PostHeader from './post_header';
import PostContent from './post_content';
import ImageCarousel from './image_carousel';
import dummyPostConsultData from '../../dummy_data/dummy_post_consult_detail.json';

const PostConsult = () => {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    // Load data from dummy-post-consult-detail.json
    setPostData(dummyPostConsultData);
  }, []);

  if (!postData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const sections = [
    { type: 'header', data: postData },
    { type: 'content', data: postData },
    { type: 'images', data: postData.image }
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return (
          <PostHeader 
            displayName={item.data.user_feng_shui[0].display_name} 
            profilePicture={item.data.user_feng_shui[0].profile_picture_url} 
            createdAt={item.data.post[0].created_at}
            feng_Shui={item.data.user_feng_shui[0].feng_shui}
          />
        );
      case 'content':
        return (
          <PostContent 
            question={item.data.question} 
            overview={item.data.post[0].overview}
          />
        );
      case 'images':
        return (
          <ImageCarousel 
            images={[
              item.data[0].imgURL1,
              item.data[0].imgURL2,
              item.data[0].imgURL3,
              item.data[0].imgURL4
            ]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FlatList
      data={sections}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.type + index}
      contentContainerStyle={styles.container}
      ListHeaderComponent={<Text style={styles.title}>Consult</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30, 
    fontWeight: 'bold', 
    marginBottom: 20,
    marginTop: 50,
  },
});

export default PostConsult;
