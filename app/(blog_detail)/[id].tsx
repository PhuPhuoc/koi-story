import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function BlogDetailPage() {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>Blog Detail for ID: {id}</Text>
            {/* Add your blog detail content here */}
        </View>
    );
}
