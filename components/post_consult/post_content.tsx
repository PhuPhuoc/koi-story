import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PostContentProps {
  question: string;
  overview: string;
}

const PostContent: React.FC<PostContentProps> = ({ question, overview }) => {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.question}>{question}</Text>
      <Text style={styles.overview}>{overview}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overview: {
    fontSize: 14,
    color: '#555',
  },
});

export default PostContent;
