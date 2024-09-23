import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
const FormField = ({
  title,
  keyboardType,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showpwd, setShowpwd] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="py-4 w-full border-2 border-black-200 px-4 flex-row bg-black-100 shadow-md rounded-md focus:border-secondary justify-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base pr-10"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showpwd}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowpwd(!showpwd)}>
            <Image
              source={!showpwd ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({});
