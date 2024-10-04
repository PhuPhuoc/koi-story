import { Stack, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

export default function MyBlogPage() {
    const router = useRouter();

    const handleBlogPress = (blogId: number) => {
        router.push(`/(blog_detail)/${blogId}`);
    };

    return (
        <View>
            <Text>My Blog List</Text>
            <TouchableOpacity onPress={() => handleBlogPress(1)}>
                <Text>Blog 1</Text>
            </TouchableOpacity>
            {/* Add more blog items as needed */}
        </View>
    );
}
