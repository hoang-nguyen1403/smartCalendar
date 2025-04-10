import React from 'react'
import { i18n, LocalizationKey } from "@/Localization";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "native-base";
import { RootScreens } from "..";

type Props = {}

export const OnBoardingScreen2 = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  return (
    <View style={styles.container}>
    <Text>Không bao giờ bỏ lỡ
    sự kiện quan trọng</Text>
    <Text>
    ...
    </Text>
    <StatusBar style="auto" />
    <Button onPress={() => props.onNavigate(RootScreens.ONBOARDING3)}>
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