import { Button, View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Payment() {
  const navigation = useNavigation();
  return (
    <View>
      <Text >Payment</Text>
      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
