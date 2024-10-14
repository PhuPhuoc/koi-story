
import { Link } from "expo-router"
import { Text, View } from "react-native"
import CarouselComponent from "../../../../components/carousel/carousel"

const BlogPage = () => {
    const id = "blog title 1"
    return (
        <View>
            <Text>BlogPage</Text>
            <Link href={`/(main_space)/blog_detail/${id}`}>See Detail blog_detail_demo</Link>
            <CarouselComponent/>
        </View>
    )
}

export default BlogPage
