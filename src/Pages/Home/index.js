import React from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyledComponent } from "nativewind";

export default function HomePage({ navigation }) {
  return (
    <StyledComponent component={View} className="flex-1 bg-FFE5D9">
      <ScrollView>
			<StyledComponent component={View} className="flex flex-row m-5 justify-between">
			<StyledComponent
				component={TouchableOpacity}
				className="bg-FFCAD4 rounded-lg w-10 h-10 flex items-center justify-center"
			>
				<Entypo name="menu" size={30} color="#9D8189" />
			</StyledComponent>
			<StyledComponent
				component={TextInput}
				className="bg-FFCAD4 rounded-lg h-10 w-56 flex text-9D8189 p-1"
				placeholder="Pesquisar suas notas"
				placeholderTextColor={"#9D8189"}
			/>

			<StyledComponent
				component={TouchableOpacity}
				className="bg-FFCAD4 rounded-lg w-10 h-10 flex items-center justify-center"
			>
				<MaterialCommunityIcons
				name="view-stream-outline"
				size={30}
				color="#9D8189"
				/>
			</StyledComponent>
			</StyledComponent>
		</ScrollView>

			<StyledComponent
				component={TouchableOpacity}
				className="bg-FFCAD4 rounded-lg w-14 h-14 flex items-center justify-center absolute bottom-0 right-0 m-5"
				>
				<Entypo name="plus" size={38} color="#9D8189" />
			</StyledComponent>
    </StyledComponent>
  );
}
