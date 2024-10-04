import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BlogPage from './index';
import ConsultPage from './consult';
import MarketPage from './market';

const TopTabs = createMaterialTopTabNavigator();

export default function BlogLayout() {
    return (
        <TopTabs.Navigator>
            <TopTabs.Screen
                name="index"
                component={BlogPage}
                options={{ title: 'Blogs' }}
            />
            <TopTabs.Screen
                name="market"
                component={MarketPage}
                options={{ title: 'Consults' }}
            />
            <TopTabs.Screen
                name="consult"
                component={ConsultPage}
                options={{ title: 'Consults' }}
            />
        </TopTabs.Navigator>
    );
}
