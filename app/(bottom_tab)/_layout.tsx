import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
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
                name="(user)"
                options={{
                    title: 'User',
                    tabBarIcon: ({ color }) => <FontAwesome name="user-circle-o" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="test"
                options={{
                    title: 'Test',
                    tabBarIcon: ({ color }) => <FontAwesome name="user-circle-o" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
