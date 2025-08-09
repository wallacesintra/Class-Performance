import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ClassProfileScreen} from "@/app/screens/ClassProfileScreen";
import {DetailedStudentScreen} from "@/app/screens/DetailedStudentScreen";


const RootStack = createNativeStackNavigator({
    screens: {
        Home: {
            screen: ClassProfileScreen,
            options: {title: 'Welcome'},
        },
        Profile: {
            screen: DetailedStudentScreen,
        },
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function NavHost() {
    // return <Navigation />;
    return (
        <RootStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Home"
        >
            <RootStack.Screen name="Home" component={ClassProfileScreen} />
            <RootStack.Screen name="StudentScreen" component={DetailedStudentScreen} />
        </RootStack.Navigator>
    )
}