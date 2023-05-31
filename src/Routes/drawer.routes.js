import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "../Pages/Home";
import CreateList from "../Pages/CreateList";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
    return(
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomePage} />
            <Drawer.Screen name="Notifications" component={CreateList} />
        </Drawer.Navigator>
    )
}