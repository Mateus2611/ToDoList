import React, { useState } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ComponentMarker from "../../Components/sticker";

export default function CreateSticker({ navigation }) {
  const [nameSticker, setNameSticker] = useState("");
  const [stickers, setStickers] = useState([]);

  const setSticker = async () => {
    try {
      if (nameSticker.trim() !== "") {
        const novoSticker = {
          id: Date.now().toString(),
          nome: nameSticker,
        };

        setStickers([...stickers, novoSticker]);
        Keyboard.dismiss();

        const updatedStickers = [...stickers, novoSticker];
        await AsyncStorage.setItem(
          "@KEY_STICKER",
          JSON.stringify(updatedStickers)
        );
        setStickers(updatedStickers);
        setNameSticker("");

        console.log("Dados Salvos com sucesso!");
      }
    } catch (error) {
      console.log(`erro: ${error}`);
    }
  };

  const removeSticker = async (idToRemove) => {
    try {
      const data = await AsyncStorage.getItem("@KEY_STICKER");

      if (data !== null) {
        const parsedData = JSON.parse(data);
        const updatedData = parsedData.filter((item) => item.id !== idToRemove);
        await AsyncStorage.setItem("@KEY_STICKER", JSON.stringify(updatedData));
        setStickers(updatedData);
        console.log("Sticker removido com sucesso!");
      }
    } catch (error) {
      console.log(`Não foi possível remover o sticker. Erro: ${error}`);
    }
  };

  React.useEffect(() => {
    const getStickers = async () => {
      try {
        const storedStickers = await AsyncStorage.getItem("@KEY_STICKER");
        if (storedStickers) {
          setStickers(JSON.parse(storedStickers));
        }
      } catch (e) {
        alert(e);
      }
    };

    getStickers();
  }, []);

  return (
    <View className="flex-1 bg-FFE5D9">
      <View className="flex flex-row mx-5 mt-3 mb-16 items-center justify-start">
        <TouchableOpacity
          className="bg-FFCAD4 rounded-2xl w-12 h-12 flex items-center justify-center"
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={30} color="#9D8189" />
        </TouchableOpacity>
        <Text className="text-9D8189 ml-2 text-2xl">Etiquetas</Text>
      </View>

      <ScrollView className="self-center m-3">
        <View
          className="flex flex-row items-center justify-between bg-F4ACB7 rounded-2xl h-12 w-80 my-4"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 5,
          }}>
          <View className="flex flex-row items-center">
            <TextInput
              placeholder="Adicionar Etiqueta"
              placeholderTextColor={"#9D8189"}
              className="text-9D8189 text-lg border-b-2 border-b-9D8189 py-0 w-56 mx-5"
              onChangeText={setNameSticker}
              value={nameSticker}
            />
          </View>
          <TouchableOpacity className="bg-F4ACB7 mr-3" onPress={setSticker}>
            <MaterialCommunityIcons
              name="bookmark-plus-outline"
              size={30}
              color={"#9D8189"}
            />
          </TouchableOpacity>
        </View>

        {stickers.map((sticker) => (
          <ComponentMarker
            key={sticker.id}
            marker={sticker}
            onRemove={() => removeSticker(sticker.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
