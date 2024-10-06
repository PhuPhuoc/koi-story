import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyBlogPage from './my_blog';
import MyConsultPage from './my_consult';

const TopTabs = createMaterialTopTabNavigator();
export default function MemberLayout() {
    return (
        <TopTabs.Navigator>
            <TopTabs.Screen
                name="my_blog"
                component={MyBlogPage}
                options={{ title: 'My Blog Sale' }}
            />
            <TopTabs.Screen
                name="my_consult"
                component={MyConsultPage}
                options={{ title: 'My Blog Consult' }}
            />
        </TopTabs.Navigator>
    );
}
