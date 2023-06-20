import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, ScrollView, TextInput } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateList({ navigation }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [nomeCheckbox, setNomeChackbox] = useState("");
  const [checkbox, setCheckbox] = useState([]);

  const adicionarCheckbox = () => {
    if (nomeCheckbox.trim() !== "") {
      const novaCheckbox = {
        id: Date.now().toString(),
        nome: nomeCheckbox,
        marcado: false,
      };

      setCheckbox([...checkbox, novaCheckbox]);
      setNomeChackbox("");
    }
  };

  const marcarCheckbox = (id) => {
    const checkboxAtualizada = checkbox.map((item) => {
      if (item.id === id) {
        return { ...item, marcado: !item.marcado };
      }
      return item;
    });
    setCheckbox(checkboxAtualizada);
  };

  const salvarDados = async () => {
    try {
      await AsyncStorage.setItem("@KEY_TITULO", titulo);
      await AsyncStorage.setItem("@KEY_DESCRICAO", descricao);
      await AsyncStorage.setItem("@KEY_CHECKBOX", JSON.stringify(checkbox));
      console.log("Dados salvos com sucesso!");
    } catch (error) {
      console.log("Erro ao salvar dados", error);
    }
  };

  useEffect(() => {
    const recuperarDados = async () => {
      try {
        const getTitulo = await AsyncStorage.getItem("@KEY_TITULO");
        const getDescricao = await AsyncStorage.getItem("@KEY_DESCRICAO");
        const getCheckbox = await AsyncStorage.getItem("@KEY_CHECKBOX");

        if (getTitulo && getDescricao && getCheckbox) {
          setTitulo(getTitulo);
          setDescricao(getDescricao);
          setCheckbox(JSON.parse(getCheckbox));

          console.log("Sucesso ao recuperar dados!");
        }
      } catch (error) {
        console.log("Erro ao recuperar dados", error);
      }
    };

    recuperarDados();
  }, []);

  return (
    <View className="flex-1 bg-FFE5D9">
      <View className=" flex flex-row justify-between">
        <View className="flex flex-row mx-5 mt-3 mb-16 items-center justify-start">
          <TouchableOpacity
            className="bg-FFCAD4 rounded-2xl w-12 h-12 flex items-center justify-center"
            onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={30} color="#9D8189" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <TextInput
          placeholder="Adicionar Titulo"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          placeholder="Insira a descrição"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />
        <View className="flex flex-row items-center">
          <TextInput
            placeholder="Adicionar item"
            value={nomeCheckbox}
            onChangeText={setNomeChackbox}
          />
          <TouchableOpacity onPress={adicionarCheckbox}>
            <Entypo name="plus" size={30} color={"#9D8189"} />
          </TouchableOpacity>
        </View>

        <Text>Itens Desmarcados</Text>
        {checkbox
          .filter((item) => !item.marcado)
          .map((item) => (
            <View key={item.id} className="flex flex-row items-center">
              <Checkbox
                value={item.marcado}
                onValueChange={() => marcarCheckbox(item.id)}
              />
              <Text>{item.nome}</Text>
            </View>
          ))}

        <Text>Itens Marcados</Text>
        {checkbox
          .filter((item) => item.marcado)
          .map((item) => (
            <View key={item.id} className="flex flex-row items-center">
              <Checkbox
                value={item.marcado}
                onValueChange={() => marcarCheckbox(item.id)}
              />
              <Text>{item.nome}</Text>
            </View>
          ))}

        <TouchableOpacity onPress={salvarDados}>
          <Text>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
