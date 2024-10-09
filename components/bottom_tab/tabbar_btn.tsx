import { Pressable, StyleSheet, GestureResponderEvent } from 'react-native'
import React, { useEffect } from 'react'
import Feather from '@expo/vector-icons/Feather';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const icon = {
    "(blog)": (props: any) => <Feather name="home" size={24} {...props} />,
    "(member)": (props: any) => <Feather name="compass" size={24} {...props} />,
    "(user_info)": (props: any) => <Feather name="user" size={24} {...props} />
}

const TabbarButton = ({ onPress, onLongPress, isFocused, routeName, label }: { onPress: (event: GestureResponderEvent) => void, onLongPress: (event: GestureResponderEvent) => void, isFocused: boolean, routeName: string, label: any }) => {
    const scale = useSharedValue(0)

    useEffect(() => {
        scale.value = withSpring(typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused, { duration: 350 })
    }, [scale, isFocused])

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.3])
        const topValue = interpolate(scale.value, [0, 1], [0, 9])


        return {
            transform: [{
                scale: scaleValue
            }],
            top: topValue
        }
    })

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1, 0])

        return { opacity, }
    })

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbaritem}
        >
            <Animated.View style={animatedIconStyle}>
                {icon[routeName as keyof typeof icon]({
                    color: isFocused ? '#FFF' : '#222'
                })}
            </Animated.View>
            <Animated.Text style={[{ color: isFocused ? '#FFF' : '#222' }, animatedTextStyle]}>
                {typeof label === 'string' ? label : label({ focused: isFocused, color: isFocused ? '#FFF' : '#222', position: 'below-icon', children: '' })}
            </Animated.Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    tabbaritem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    }
})

export default TabbarButton
