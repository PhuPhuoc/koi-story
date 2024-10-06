import { Redirect, router } from "expo-router"
import { Button, Text, View } from "react-native"

const LogginPage = () => {
    // return (
    //     <View>
    //         <Text>LogginPage</Text>
    //         <Button onPress={() => router.push("/(tabs)/blog")} title="Click hear"></Button>
    //     </View>
    // )
    return <Redirect href={"/(tabs)/blog"} />
}

export default LogginPage
