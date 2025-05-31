import React from "react";
import { i18n, LocalizationKey } from "@/Localization";
import { View, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { RootScreens } from "..";
import { Text, Button } from "react-native-paper";


export const Welcome = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  return (
    <View style={styles.container}>
      <View>
        <StatusBar style="auto" />
        <Image
          source={require('../../../assets/wellcome.png')}
        />
        <Text  style={styles.tilte} >Smart Calendar</Text>
      </View>
      <Button icon="arrow-right"
          mode="contained"
          style={styles.btn}
          onPress={() => {
            props.onNavigate(RootScreens.ONBOARDING1)
          }}
          >Bấm ngay để khám phá
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 200,
    flex: 1,
    backgroundColor: "#6C63FF",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tilte: {
    fontSize: 30,
    color: "#FFFFFF"
  },
  btn:{
    paddingBottom: 50,
    backgroundColor: "#6C63FF",
  }
});
