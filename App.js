import React from "react";
import { StatusBar, SafeAreaView, Text, View } from "react-native";

import MyStack from "./src/Routes/stack.routes";

export default function App() {
	return (
		<SafeAreaView className="flex-1">
			<MyStack />
			<StatusBar backgroundColor="white" barStyle="dark-content" />
		</SafeAreaView>
	);
}
