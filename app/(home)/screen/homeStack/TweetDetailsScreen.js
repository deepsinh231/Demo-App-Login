import { Button, View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import TweetContent from "@/app/components/TweetContent";

export default function TweetDetailsScreen() {
  const navigate = useNavigation();
  const route = useRoute();
  const { params } = route;
  useLayoutEffect(() => {
    navigate.setOptions({
      headerTitle: params.tweet.author.name,
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button title="Go Back" onPress={() => navigate.goBack()}></Button>
      <TweetContent tweet={params.tweet} />
    </SafeAreaView>
  );
}
