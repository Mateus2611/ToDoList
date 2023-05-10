import React from "react";
import HomePage from "../Pages/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const { Screen, Navigator } = createNativeStackNavigator();

function MyStack() {
	return (
		<NavigationContainer>
			<Navigator>
				<Screen name="HomePage" component={HomePage} options={{
					headerShown: false
				}}/>
			</Navigator>
		</NavigationContainer>
	);
}

export default MyStack;
