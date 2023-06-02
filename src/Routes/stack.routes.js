import React from "react";
import HomePage from "../Pages/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./drawer.routes";
import CreateList from "../Pages/CreateList";

const { Screen, Navigator } = createNativeStackNavigator();

function MyStack() {
	return (
		<NavigationContainer>
			<Navigator screenOptions={{ headerShown: false }}>
				<Screen name="MyDrawer" component={MyDrawer} />
				<Screen name="HomePage" component={HomePage} />
				<Screen name="CreateList" component={CreateList} />
			</Navigator>
		</NavigationContainer>
	);
}

export default MyStack;
