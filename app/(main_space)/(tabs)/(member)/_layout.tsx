import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyBlogPage from './my_blog';
import MyConsultPage from './my_consult';
import RecommendPage from './recommend';

const TopTabs = createMaterialTopTabNavigator();
export default function MemberLayout() {
    return (
        <TopTabs.Navigator>
            <TopTabs.Screen
                name="recommend"
                component={RecommendPage}
                options={{ title: 'Recommend' }}
            />
            <TopTabs.Screen
                name="my_blog"
                component={MyBlogPage}
                options={{ title: 'My Market' }}
            />
            <TopTabs.Screen
                name="my_consult"
                component={MyConsultPage}
                options={{ title: 'My Consult' }}
            />
        </TopTabs.Navigator>
    );
}
