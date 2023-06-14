import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Feather, Entypo } from '@expo/vector-icons';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateList({ navigation }) {

	const [titulo, setTitulo] = useState("");
	const [descricao, setDescricao] = useState("");
	const [nomeItemLista, setNomeItemLista] = useState("");
	const [itemLista, setItemLista] = useState([]);


	


	const addItem = async () => {
		if (nomeItemLista.trim() !== "") {
			const novoItem = {
				texto: nomeItemLista,
				marcador: false,
			};
			setItemLista([...itemLista, novoItem]);
			setNomeItemLista("");
		}
	};

	const marcarItem = (index) => {
		const itensAtualizados = [...itemLista];
		itensAtualizados[index].marcado = !itensAtualizados[index].marcado;
		setItemLista(itensAtualizados);
	}


	const renderItemUnchecked = itemLista
		.filter((item) => !item.marcado)
		.map((item, index) => (
			<View key={index} className="flex flex-row items-center" >
				<Checkbox color={"#9D8189"} value={item.marcado} onValueChange={() => marcarItem(index)} />
				<Text className="text-9D8189 text-lg m-2" >{item.texto}</Text>
			</View>
		));


	const renderItemChecked = itemLista
		.filter((item) => item.marcado)
		.map((item, index) => (
		<View key={index} className="flex flex-col">
			<View className="flex flex-row items-center" >
				<Checkbox color={"#9D8189"} value={item.marcado} onValueChange={() => marcarItem(index)} />
				<Text className="text-9D8189 text-lg m-2">{item.texto}</Text>
			</View>
		</View>
	));





	return (
		<View className="flex-1 bg-FFE5D9">
			<View className=" flex flex-row justify-between">
				<View className="flex flex-row mx-5 mt-3 mb-16 items-center justify-start">
					<TouchableOpacity
					className="bg-FFCAD4 rounded-2xl w-12 h-12 flex items-center justify-center"
					onPress={() => navigation.goBack()}
					>
						<Feather name="arrow-left" size={30} color="#9D8189" />
					</TouchableOpacity>
				</View>


				<View className="flex flex-row mx-1">
				<View className="flex flex-row mx-5 mt-3 mb-16 items-center justify-start">
					<TouchableOpacity
					className="bg-FFCAD4 rounded-2xl w-12 h-12 flex items-center justify-center"
					onPress={console.log("Favorito")}
					>
						<Feather name="star" size={30} color="#9D8189" />
					</TouchableOpacity>
				</View>


				<View className="flex flex-row mx-5 mt-3 mb-16 items-center justify-start">
					<TouchableOpacity
					className="bg-FFCAD4 rounded-2xl w-12 h-12 flex items-center justify-center"
					onPress={console.log("Alerta")}
					>
						<Feather name="bell" size={30} color="#9D8189" />
					</TouchableOpacity>
				</View>
				</View>
			</View>


			<ScrollView className="self-center">
				<View className="flex flex-row items-center bg-F4ACB7 h-20 w-96 rounded-t-2xl">
					<View>
						<View className="bg-FFE5D9 rounded-full my-2 ml-3 mr-4 w-4 h-4" />
						<View className="bg-FFE5D9 rounded-full my-2 ml-3 mr-4 w-4 h-4" />
					</View>
					<TextInput placeholder="Adicionar Titulo" placeholderTextColor={"#9D8189"} className="text-9D8189 text-2xl border-b-2 border-b-9D8189 py-1 w-80" onChangeText={ (titulo) => setTitulo(titulo) }/>
				</View>


				<View className="flex flex-row items-center bg-D8E2DC h-96 w-96 rounded-b-2xl">
					<View>
						<View className="bg-FFE5D9 rounded-full my-2 ml-3 mr-4 w-4 h-4" />
						<View className="bg-FFE5D9 rounded-full my-2 ml-3 mr-4 w-4 h-4" />
						<View className="bg-FFE5D9 rounded-full my-2 ml-3 mr-4 w-4 h-4" />
						<View className="bg-FFE5D9 rounded-full my-2 ml-3 mr-4 w-4 h-4" />
						<View className="bg-FFE5D9 rounded-full my-2 ml-3 mr-4 w-4 h-4" />
						<View className="bg-FFE5D9 rounded-full my-2 ml-3 mr-4 w-4 h-4" />
						<View className="bg-FFE5D9 rounded-full my-2 ml-3 mr-4 w-4 h-4" />
						<View className="bg-FFE5D9 rounded-full my-2 ml-3 mr-4 w-4 h-4" />
						<View className="bg-FFE5D9 rounded-full my-2 ml-3 mr-4 w-4 h-4" />
						<View className="bg-FFE5D9 rounded-full my-2 ml-3 mr-4 w-4 h-4" />
						<View className="bg-FFE5D9 rounded-full my-2 ml-3 mr-4 w-4 h-4" />
						<View className="bg-FFE5D9 rounded-full my-2 ml-3 mr-4 w-4 h-4" />
					</View>


					<View >
						<TextInput
							className="text-9D8189 text-lg"
							placeholderTextColor={"#9D8189"}
							autoFocus
							multiline
							placeholder="Insira a descrição..."
							onChangeText={ (descricao) => setDescricao(descricao) }
						/>


						<View className="flex-row">
							<TextInput className="text-9D8189 text-lg border-b-2 border-b-9D8189 py-1 w-64" placeholder="Adicionar tarefa" placeholderTextColor={"#9D8189"} value={nomeItemLista} onChangeText={setNomeItemLista} />
							<TouchableOpacity onPress={addItem}>
								<Entypo name="plus" size={30} color="#9D8189" />
							</TouchableOpacity>
						</View>


						{renderItemUnchecked}

						<Text className="text-9D8189 text-lg">Itens marcados:</Text>
						{renderItemChecked}

					</View>
				</View>
			</ScrollView>


			<TouchableOpacity
				className="bg-FFCAD4 rounded-2xl w-16 h-16 flex items-center justify-center absolute bottom-0 right-0 m-5"
				onPress={console.log("modal")}
			>
				<Entypo name="dots-three-vertical" size={40} color="#9D8189" />
			</TouchableOpacity>
		</View>
	);
}
