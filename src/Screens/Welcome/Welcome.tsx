import React from "react";
import { i18n, LocalizationKey } from "@/Localization";
import { View, Text, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "native-base";
import { RootScreens } from "..";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export const Welcome = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {

  const setFirstTimeLoad = async () =>{
    const result = await AsyncStorage.setItem("firstTimeLoad", "false")
  }

  useEffect(()=>{
    setFirstTimeLoad()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        source={require('../../../assets/wellcome.png')}
        style={{ width: 200, height: 200 }}
      />
      <Text  style={styles.tilte} >Smart Calendar</Text>

      <Button onPress={() =>  props.onNavigate(RootScreens.ONBOARDING1)}>
        {i18n.t(LocalizationKey.START)}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6C63FF",
    alignItems: "center",
    justifyContent: "center",
  },
  tilte: {
    fontSize: 30,
    color: "#FFFFFF"
  }
});
