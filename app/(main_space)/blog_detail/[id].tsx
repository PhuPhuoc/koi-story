
import { Stack, useGlobalSearchParams } from "expo-router"
import { Text, View } from "react-native"

const DetailPage = () => {
    const { id } = useGlobalSearchParams()
    return (
        <View>
            <Stack.Screen options={{ headerTitle: `${id}` }} />
            <Text>Detail title: {id}</Text>
        </View>
    )
}

export default DetailPage
