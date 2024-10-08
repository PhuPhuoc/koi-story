import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BlogPage from './blog';
import ConsultPage from './consult';
import MarketPage from './market';

const TopTabs = createMaterialTopTabNavigator();

export default function BlogLayout() {
    return (
        <TopTabs.Navigator>
            <TopTabs.Screen
                name="blog"
                component={BlogPage}
                options={{ title: 'Blogs' }}
            />
            <TopTabs.Screen
                name="market"
                component={MarketPage}
                options={{ title: 'Market' }}
            />
            <TopTabs.Screen
                name="consult"
                component={ConsultPage}
                options={{ title: 'Consults' }}
            />
        </TopTabs.Navigator>
    );
}
