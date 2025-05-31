import React from 'react'
import { i18n, LocalizationKey } from "@/Localization";
import { View, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text, Button } from "react-native-paper";
import { RootScreens } from "..";
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {}

export const OnBoardingScreen3 = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const setFirstTimeLoad = async () =>{
    const result = await AsyncStorage.setItem("firstTimeLoad", "false")
  }

  return (
    <View style={styles.container}>
       <View style={styles.innerwrapper}>
        <Image source={require("../../../assets/onboarding3.png")} />
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.title}>
          Thiết lập lịch trình theo cách của bạn
          </Text>

          <Text variant="bodyMedium" style={styles.subtitle}>
          Chọn chủ đề, màu sắc và cách hiển thị lịch phù hợp với phong cách làm việc của bạn
          </Text>
        </View>
      </View>

      <View>
        <Button
          icon="arrow-right"
          mode="contained"
          onPress={() => {
            props.onNavigate(RootScreens.MAIN)
            setFirstTimeLoad()
          }}
        >
          Tiếp theo
        </Button>
      </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    padding: 20,
    paddingTop: 160,
    paddingBottom: 80,
  },
  innerwrapper:{
    alignItems: "center",

  },
  header:{
    display: "flex",
    flexDirection: "column",
    padding: 40,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",

  },
  subtitle:{
    marginTop: 10,
    textAlign: "center",
  },
  title:{
    marginTop: 10,
    textAlign: "center",
  }
});