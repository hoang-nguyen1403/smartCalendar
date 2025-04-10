import React from 'react'
import { i18n, LocalizationKey } from "@/Localization";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "native-base";
import { RootScreens } from "..";

type Props = {}

export const OnBoardingScreen1 = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  return (
    <View style={styles.container}>
    <Text>Tất cả lịch trình của bạn,
    một nơi duy nhất</Text>
    <Text>
    Kết nối Smart Calendar với 
      Google, Outlook hoặc Apple 
      Calendar để đồng bộ lịch trình 
      dễ dàng
    </Text>
    <StatusBar style="auto" />
    <Button onPress={() => props.onNavigate(RootScreens.ONBOARDING2)}>
      ->
    </Button>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});