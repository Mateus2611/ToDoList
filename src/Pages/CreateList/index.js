import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Feather, Entypo } from '@expo/vector-icons';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateList({ navigation }) {

	const [titulo, setTitulo] = useState("");
	const [descricao, setDescricao] = useState("");
	const [nomeCheckbox, setNomeChackbox] = useState("");
	const [checkbox, setCheckbox] = useState([]);


	const adicionarCheckbox = (nome) => {
		const novaCheckbox = {
			nome,
			marcado: false,
		};

		setCheckbox([...checkbox, novaCheckbox]);
	};


	const marcarCheckbox = (index) => {
		const checkboxAtualizada = [...checkbox];
		checkboxAtualizada[index].marcado = !checkboxAtualizada[index].marcado;
		setCheckbox(checkboxAtualizada);
	}


	const salvarDados = async () => {
		try {
			await AsyncStorage.setItem("@KEY_TITULO", titulo);
			await AsyncStorage.setItem("@KEY_DESCRICAO", descricao);
			await AsyncStorage.setItem("@KEY_CHECKBOX", JSON.stringify(checkbox));
			console.log("Dados salvos com sucesso!");
		} catch (error) {
			console.log("Erro ao salvar dados", error);		}
	};


	React.useEffect(() => {
		const recuperarDados = async () => {
			try {
				const getTitulo = await AsyncStorage.getItem("@KEY_TITULO");
				const getDescricao = await AsyncStorage.getItem("@KEY_DESCRICAO");
				const getCheckbox = await AsyncStorage.getItem("@KEY_CHECKBOX");

				if (getTitulo && getDescricao && getCheckbox) {
					setTitulo(getTitulo);
					setDescricao(getDescricao);
					setCheckbox(JSON.parse(getCheckbox));

					console.log("Sucesso ao recuperar dados!")
				};
			} catch (error) {
				console.log("Erro ao recuperar dados", error);;
			}
		} 

		recuperarDados();
	}, []);

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
			</View>


			<ScrollView>
				<TextInput placeholder="Adicionar Titulo" value={titulo} onChangeText={setTitulo} />
				<TextInput placeholder="Insira a descrição" value={descricao} onChangeText={setDescricao} multiline />
				<View>
					<TextInput placeholder="Adicionar item" value={nomeCheckbox} onChangeText={setNomeChackbox} />
					<TouchableOpacity onPress={ () => adicionarCheckbox(nomeCheckbox) } >
						<Entypo name="plus" size={30} color={"#9D8189"} />
					</TouchableOpacity>
				</View>


				{checkbox.map((checkbox, index) => (
					<View key={index}>
						<Checkbox value={checkbox.marcado} onValueChange={ () => marcarCheckbox(index) }/>
						<Text>{checkbox.nome}</Text>
					</View>
				))}

				<TouchableOpacity onPress={salvarDados}>
					<Text>Salvar</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}
