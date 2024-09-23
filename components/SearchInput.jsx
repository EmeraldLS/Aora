import {
  Alert,
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
import { router, usePathname } from "expo-router";
const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className="py-4 w-full border-2 border-black-200 px-4 flex-row bg-black-100 shadow-md rounded-md focus:border-secondary justify-center space-x-4">
      <TextInput
        className="flex-1 text-white mt-0.5 text-base font-pregular"
        value={query}
        placeholder={"Search for a video"}
        placeholderTextColor="#CDCDE0"
        onChangeText={(v) => setQuery(v)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "PLease input something to search"
            );
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({});
