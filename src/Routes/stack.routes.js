import React from "react";
import HomePage from "../Pages/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./drawer.routes";

const { Screen, Navigator } = createNativeStackNavigator();

function MyStack() {
	return (
		<NavigationContainer>
			<Navigator>
				<Screen name="HomePage" component={HomePage} options={{
					headerShown: false
				}}/>

				<Screen name="Drawer" component={MyDrawer} />
			</Navigator>
		</NavigationContainer>
	);
}

export default MyStack;
