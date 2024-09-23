import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchInput from "../../components/SearchInput";

import EmptyState from "../../components/EmptyState";
import { searchPost } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";
const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPost(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className=" h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="px-4">
            <View>
              <Text className="font-pmedium text-sm text-gray-100">
                Search Result
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                {query}
              </Text>
            </View>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No Video found for the search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
