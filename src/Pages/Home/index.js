import React from "react";
import { ScrollView, Text, View, StatusBar } from "react-native";
import { Entypo } from '@expo/vector-icons';

export default function HomePage({ navigation }) {
	return (
		<ScrollView className="flex-1 bg-FFE5D9">
			<StatusBar backgroundColor="#FFE5D9" barStyle="dark-content" />
			<View className="bg-F4ACB7 rounded-lg w-10 h-10 m-5 flex items-center">
				<Entypo name="menu" size={30} color="#9D8189"/>
			</View>
		</ScrollView>
	);
}
