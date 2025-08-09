import * as React from 'react';
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

export default function App() {
    return <Navigation />;
}