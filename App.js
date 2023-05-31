import React from "react";
import { StatusBar, SafeAreaView, Text, View, ScrollView } from "react-native";
import { StyledComponent } from "nativewind";

import MyStack from "./src/Routes/stack.routes";

export default function App() {
	return (
		<StyledComponent component={SafeAreaView} className="flex-1 bg-FFE5D9">
			<MyStack />
			<StatusBar backgroundColor="#FFE5D9" barStyle="dark-content" />
		</StyledComponent>
	);
}
