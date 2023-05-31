import React from "react";
import { View, TextInput } from "react-native/types";
import { StyledComponent } from "nativewind";
import Checkbox from "expo-checkbox";

export default function CardNotes() {

    return(
        <StyledComponent component={View} className="flex-1 self-center">
            <StyledComponent component={View}>
                <Checkbox />
                <TextInput />
            </StyledComponent>
        </StyledComponent>
    );
}