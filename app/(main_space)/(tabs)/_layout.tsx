import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import MyTabBar from '../../../components/bottom_tab/bottom_tab';

export default function TabLayout() {
    return (
        <Tabs
            tabBar={props => <MyTabBar {...props} />}
            screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
                name="(blog)"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="(member)"
                options={{
                    title: 'Member',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
            <Tabs.Screen
                name="(user_info)"
                options={{
                    title: 'User',
                    tabBarIcon: ({ color }) => <FontAwesome name="user-circle-o" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
