
import { Link } from "expo-router"
import { Text, View } from "react-native"

const BlogPage = () => {
    const id = "blog title 1"
    return (
        <View>
            <Text>BlogPage</Text>
            <Link href={`/(main_space)/blog_detail/${id}`}>See Detail blog_detail_demo</Link>
        </View>
    )
}

export default BlogPage
