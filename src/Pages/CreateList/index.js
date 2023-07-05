import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import {
  Feather,
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateList({ navigation }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [nomeCheckbox, setNomeCheckbox] = useState("");
  const [checkbox, setCheckbox] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [stickerModal, setStickerModal] = useState(false);
  const [stickerOptions, setStickerOptions] = useState([]);
  const [sticker, setSticker] = useState([]);

  const adicionarCheckbox = () => {
    if (nomeCheckbox.trim() !== "") {
      const novaCheckbox = {
        id: Date.now().toString(),
        nome: nomeCheckbox,
        marcado: false,
      };

      setCheckbox([...checkbox, novaCheckbox]);
      setNomeCheckbox("");
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

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleStickerModal = () => {
    setStickerModal(!stickerModal);
  };

  const selectSticker = (stickerSelected) => {
    const { id, nome } = stickerSelected;

    if (sticker !== null && sticker.length !== 0) {
      const stickerExists = sticker.some((sticker) => sticker.id === id);
      if (stickerExists) {
        alert(`O sticker "${nome}" já foi adicionado anteriormente.`);
        return;
      }
    }

    const newMarker = {
      id: id,
      nome: nome,
    };

    if (sticker === null) {
      setSticker([newMarker]);
    } else {
      setSticker([...sticker, newMarker]);
    }

    setModalVisible(false);
    setStickerModal(false);

    console.log("Sticker selecionado com sucesso!");
  };

  function checkboxVazia() {
    if (checkbox === null) {
      return null;
    }

    return checkbox
      .filter((item) => !item.marcado)
      .map((item) => (
        <View key={item.id} className="flex flex-row items-center my-3">
          <Checkbox
            className="w-6 h-6 mr-2"
            color={"#9D8189"}
            value={item.marcado}
            onValueChange={() => marcarCheckbox(item.id)}
          />
          <Text className="text-9D8189 text-xl">{item.nome}</Text>
          <TouchableOpacity
            onPress={() => removeCheckbox(item.id)}
            className="ml-3 items-center">
            <MaterialCommunityIcons name="close" size={24} color={"#9D8189"} />
          </TouchableOpacity>
        </View>
      ));
  }

  function checkboxMarcada() {
    if (checkbox === null) {
      return null;
    }

    return checkbox
      .filter((item) => item.marcado)
      .map((item) => (
        <View key={item.id} className="flex flex-row items-center my-3">
          <Checkbox
            className="w-6 h-6 mr-2"
            color={"#9D8189"}
            value={item.marcado}
            onValueChange={() => marcarCheckbox(item.id)}
          />
          <Text className="text-9D8189 text-xl">{item.nome}</Text>
          <TouchableOpacity
            onPress={() => removeCheckbox(item.id)}
            className="ml-3 items-center">
            <MaterialCommunityIcons name="close" size={24} color={"#9D8189"} />
          </TouchableOpacity>
        </View>
      ));
  }

  const removeCheckbox = (id) => {
    const updatedCheckbox = checkbox.filter((item) => item.id !== id);
    setCheckbox(updatedCheckbox);
  };

  function generateSticker() {
    if (sticker === null) {
      return null;
    }

    return sticker.map((sticker) => (
      <View
        className="flex flex-row items-center justify-around bg-F4ACB7 rounded-2xl h-12 w-56 max-w-max my-2"
        key={sticker.id}>
        <Text className="text-9D8189 p-2 text-lg justify-start">
          {sticker.nome}
        </Text>
        <TouchableOpacity
          className="flex flex-row justify-end items-center"
          onPress={() => removeSticker(sticker.id)}>
          <MaterialCommunityIcons name="close" size={30} color={"#9D8189"} />
        </TouchableOpacity>
      </View>
    ));
  }

  const removeSticker = (id) => {
    const updatedSticker = sticker.filter((item) => item.id !== id);
    setSticker(updatedSticker);
  };

  const salvarDados = async () => {
    try {
      await AsyncStorage.setItem("@KEY_TITULO", titulo);
      await AsyncStorage.setItem("@KEY_DESCRICAO", descricao);
      await AsyncStorage.setItem("@KEY_CHECKBOX", JSON.stringify(checkbox));
      await AsyncStorage.setItem("@KEY_ETIQUETA", JSON.stringify(sticker));
      console.log("Dados salvos com sucesso!");
    } catch (error) {
      console.log(`Erro ao salvar dados: ${error}`);
    }
  };

  useEffect(() => {
    const recuperarDados = async () => {
      try {
        const getTitulo = await AsyncStorage.getItem("@KEY_TITULO");
        const getDescricao = await AsyncStorage.getItem("@KEY_DESCRICAO");
        const getCheckbox = await AsyncStorage.getItem("@KEY_CHECKBOX");
        const getSticker = await AsyncStorage.getItem("@KEY_ETIQUETA");
        const storedStickers = await AsyncStorage.getItem("@KEY_STICKER");

        if (
          getTitulo ||
          getDescricao ||
          getCheckbox ||
          storedStickers ||
          getSticker
        ) {
          setTitulo(getTitulo);
          setDescricao(getDescricao);
          setCheckbox(JSON.parse(getCheckbox));
          setSticker(JSON.parse(getSticker));
          setStickerOptions(JSON.parse(storedStickers));

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

      <ScrollView className="flex-1 mb-5">
        <View className="flex flex-col items-center">
          <View className="flex flex-row items-center bg-F4ACB7 rounded-t-xl h-16 w-96 p-4">
            <TextInput
              className="text-9D8189 text-2xl border-b-2 border-b-9D8189 py-0 w-80"
              maxLength={20}
              placeholderTextColor={"#9D8189"}
              placeholder="Adicionar Titulo"
              value={titulo}
              onChangeText={setTitulo}
            />
          </View>

          <View className="flex flex-col justify-evenly bg-D8E2DC rounded-b-xl min-h-max h-auto max-h-full w-96 p-4">
            <TextInput
              className="text-9D8189 text-xl my-5"
              placeholderTextColor={"#9D8189"}
              placeholder="Insira a descrição"
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />
            <View className="flex flex-row items-center">
              <TextInput
                className="text-9D8189 text-xl border-b-2 border-b-9D8189 py-0 w-auto mr-1 mb-2"
                placeholderTextColor={"#9D8189"}
                placeholder="Adicionar item"
                value={nomeCheckbox}
                onChangeText={setNomeCheckbox}
              />
              <TouchableOpacity onPress={adicionarCheckbox}>
                <Entypo name="plus" size={30} color={"#9D8189"} />
              </TouchableOpacity>
            </View>

            {checkboxVazia()}

            <View className="mb-5">
              <Text className="text-9D8189 text-2xl my-2">Itens Marcados:</Text>
              {checkboxMarcada()}
            </View>

            <View>
              <Text className="text-9D8189 text-2xl my-2">Etiquetas:</Text>
              {generateSticker()}
            </View>

            <TouchableOpacity
              onPress={salvarDados}
              className="bg-9D8189 rounded-2xl items-center justify-center my-8">
              <Text className="text-xl text-FFFFFF m-1">Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <>
        <TouchableOpacity
          className="bg-FFCAD4 rounded-2xl w-16 h-16 flex items-center justify-center absolute bottom-0 right-0 m-5 z-1"
          onPress={toggleModal}>
          <Entypo name="dots-three-vertical" size={40} color="#9D8189" />
        </TouchableOpacity>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View className="flex-1 justify-end items-center bg-SHADOW">
            <View
              className="w-full h-2/4 bg-D8E2DC p-3"
              style={{
                elevation: 10,
                shadowColor: "#000",
                shadowOpacity: 0.8,
                shadowOffset: { width: 0, height: -4 },
                shadowRadius: 10,
              }}>
              <View className="flex items-center justify-center">
                <TouchableOpacity className="flex flex-row items-center justify-start bg-F4ACB7 rounded-2xl h-12 w-96 my-4 px-3">
                  <MaterialIcons
                    name="delete-outline"
                    size={30}
                    color={"#9D8189"}
                  />
                  <Text className="text-9D8189 ml-2 text-2xl mx-2">
                    Excluir
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex flex-row items-center justify-start bg-F4ACB7 rounded-2xl h-12 w-96 my-4 px-3"
                  onPress={toggleStickerModal}>
                  <Feather name="bookmark" size={30} color={"#9D8189"} />
                  <Text className="text-9D8189 ml-2 text-2xl mx-2">
                    Etiquetas
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex flex-row items-center justify-start bg-F4ACB7 rounded-2xl h-12 w-96 my-4 px-3">
                  <MaterialCommunityIcons
                    name="folder-open-outline"
                    size={30}
                    color={"#9D8189"}
                  />
                  <Text className="text-9D8189 ml-2 text-2xl mx-2">
                    Arquivar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              className="bg-FFCAD4 rounded-2xl w-16 h-16 flex items-center justify-center absolute bottom-0 right-0 m-5 mb-3 z-1"
              onPress={toggleModal}>
              <Entypo name="dots-three-vertical" size={40} color="#9D8189" />
            </TouchableOpacity>
          </View>
        </Modal>
      </>

      <Modal animationType="slide" transparent={true} visible={stickerModal}>
        <View className="flex-1 items-center justify-center my-48 mx-9 bg-FFE5D9 rounded-2xl">
          <TouchableOpacity
            className="m-1 absolute top-3 right-3"
            onPress={() => setStickerModal(false)}>
            <MaterialCommunityIcons name="close" size={30} color={"#9D8189"} />
          </TouchableOpacity>
          <ScrollView className="px-10 my-14 border-y-2 border-y-F4ACB7">
            {stickerOptions.map((stickerOptions) => (
              <TouchableOpacity
                key={stickerOptions.id}
                className="flex flex-row items-center justify-between bg-F4ACB7 rounded-2xl m-auto h-auto self-center my-2"
                onPress={() => selectSticker(stickerOptions)}>
                <Text className="text-9D8189 p-2 text-lg mx-5">
                  {stickerOptions.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
