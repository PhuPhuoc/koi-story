import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserPage from './user_page';
import PondFengShuiPage from './pond_fengshui';
import KoiFengShuiPage from './koi_fengshui';

const TopTabs = createMaterialTopTabNavigator();

export default function UserLayout() {
    return (
        <TopTabs.Navigator>
            <TopTabs.Screen
                name="user_page"
                component={UserPage}
                options={{ title: 'User Info' }}
            />
            <TopTabs.Screen
                name="koi_fengshui"
                component={KoiFengShuiPage}
                options={{ title: 'Koi' }}
            />
            <TopTabs.Screen
                name="pond_fengshui"
                component={PondFengShuiPage}
                options={{ title: 'Pond' }}
            />
        </TopTabs.Navigator>
    );
}
