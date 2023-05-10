import React from "react";
import { ScrollView, Text, View, StatusBar } from "react-native";

export default function HomePage({ navigation }) {
	return (
		<ScrollView className="fkex-1 bg-FFE5D9">
			<StatusBar backgroundColor="#FFE5D9" barStyle="dark-content" />
			<View>
				<Text>Hello World!!!</Text>
			</View>
		</ScrollView>
	);
}
