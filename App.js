import React from "react";
import { StatusBar, SafeAreaView, Text, View } from "react-native";

import MyStack from "./src/Routes/stack.routes";

export default function App() {
	return (
		<SafeAreaView className="flex-1 bg-FFE5D9">
			<MyStack />
			<StatusBar backgroundColor="#FFE5D9" barStyle="dark-content" />
		</SafeAreaView>
	);
}
