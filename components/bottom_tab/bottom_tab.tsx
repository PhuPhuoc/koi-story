import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import TabbarButton from './tabbar_btn';
import { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { THEME_COLOR } from '../../constants/const';

const MyTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const [dimensions, setDimensions] = useState({ height: 20, width: 100 })
    const btnWidth = dimensions.width / state.routes.length

    const onTabbarLayout = (e: LayoutChangeEvent) => {
        setDimensions({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height
        })
    }

    const tabPositionX = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: tabPositionX.value
                }
            ]
        }
    })

    return (
        <View onLayout={onTabbarLayout} style={styles.tabbar}>
            <Animated.View style={[animatedStyle, {
                position: "absolute",
                backgroundColor: THEME_COLOR,
                borderRadius: 30,
                marginHorizontal: 12,
                height: dimensions.height - 15,
                width: btnWidth - 25,
            }]}>

            </Animated.View>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    tabPositionX.value = withSpring(btnWidth * index, { duration: 1500 })
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabbarButton
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        routeName={route.name}
                        label={label}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabbar: {
        position: "absolute",
        bottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        marginHorizontal: 55,
        paddingVertical: 10,
        borderRadius: 35,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1
    }
})

export default MyTabBar
