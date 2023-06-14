import React from "react";
import {
	ScrollView,
	View,
	TouchableOpacity,
	TextInput,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CreateList from "../CreateList";

export default function HomePage({ navigation }) {
	return (
		<View className="flex-1 bg-FFE5D9">
			<ScrollView>
				<View
					className="flex flex-row m-5 items-center justify-between"
				>
					<TouchableOpacity
						className="bg-FFCAD4 rounded-2xl w-12 h-12 flex items-center justify-center"
						onPress={() => navigation.openDrawer()}
					>
						<Entypo name="menu" size={30} color="#9D8189" />
					</TouchableOpacity>

					<TextInput
						className="bg-FFCAD4 rounded-xl h-12 w-60 flex text-9D8189 p-2 text-lg"
						placeholder="Pesquisar suas notas"
						placeholderTextColor={"#9D8189"}
					/>

					<TouchableOpacity
						className="bg-FFCAD4 rounded-2xl w-12 h-12 flex items-center justify-center"
					>
						<MaterialCommunityIcons
							name="view-stream-outline"
							size={30}
							color="#9D8189"
						/>
					</TouchableOpacity>
				</View>
			</ScrollView>

			<TouchableOpacity
				className="bg-FFCAD4 rounded-2xl w-16 h-16 flex items-center justify-center absolute bottom-0 right-0 m-5"
				onPress={() => navigation.navigate(CreateList)}
			>
				<Entypo name="plus" size={40} color="#9D8189" />
			</TouchableOpacity>
		</View>
	);
}
