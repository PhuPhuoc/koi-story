import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import PostHeader from './post_header';
import PostContent from './post_content';
import ImageCarousel from './image_carousel';
import dummyPostConsultData from '../../dummy_data/dummy_post_consult_detail.json';

interface UserFengShui {
  display_name: string;
  profile_picture_url: string;
  feng_shui: string;
}

interface Post {
  title: string;
  overview: string;
  created_at: string;
}

interface ImageUrls {
  imgURL1: string;
  imgURL2: string;
  imgURL3: string;
  imgURL4: string;
}

interface PostConsultData {
  id: number;
  user_feng_shui: UserFengShui[];
  post: Post[];
  question: string;
  image: ImageUrls[];
}

const PostConsult = () => {
  const [postData, setPostData] = useState<PostConsultData | null>(null);

  useEffect(() => {
    // Load data from dummy-post-consult-detail.json
    setPostData(dummyPostConsultData as PostConsultData);
  }, []);

  if (!postData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Consult</Text>
      {/* Header */}
      <PostHeader 
        displayName={postData.user_feng_shui[0].display_name} 
        profilePicture={postData.user_feng_shui[0].profile_picture_url} 
        createdAt={postData.post[0].created_at}
        feng_Shui={postData.user_feng_shui[0].feng_shui}
      />
      
      {/* Content */}
      <PostContent 
        question={postData.question} 
        overview={postData.post[0].overview}
      />

      {/* Image Carousel */}
      <ImageCarousel 
        images={[
          postData.image[0].imgURL1,
          postData.image[0].imgURL2,
          postData.image[0].imgURL3,
          postData.image[0].imgURL4
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30, 
    fontWeight: 'bold', 
    marginBottom: 20,
    marginTop: 50,
  },
});

export default PostConsult;
