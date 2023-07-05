import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ComponentMarker({ marker, onRemove }) {
  const removeSticker = async () => {
    try {
      await onRemove(marker.id);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View className="self-center">
      <View className="flex flex-row items-center justify-between bg-D8E2DC rounded-2xl h-12 w-80 my-4">
        <View className="flex flex-row items-center">
          <Text className="text-9D8189 p-2 text-lg mx-5">{marker.nome}</Text>
        </View>
        <TouchableOpacity className="bg-D8E2DC mr-3" onPress={removeSticker}>
          <MaterialIcons name="delete-outline" size={30} color={"#9D8189"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
