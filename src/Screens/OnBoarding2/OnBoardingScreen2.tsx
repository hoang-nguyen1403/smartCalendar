import React from "react";
import { i18n, LocalizationKey } from "@/Localization";
import { View, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { RootScreens } from "..";
import { Text, Button } from "react-native-paper";

type Props = {};

export const OnBoardingScreen2 = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerwrapper}>
        <Image source={require("../../../assets/onboarding2.png")} />
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.title}>
            Không bao giờ bỏ lỡ sự kiện quan trọng
          </Text>

          <Text variant="bodyMedium" style={styles.subtitle}>
            Nhận thông báo và nhắc nhở thông minh giúp bạn không bao giờ quên
            các cuộc họp, sinh nhật hay công viêc quan trọng.
          </Text>
        </View>
      </View>

      <View>
        <Button
          icon="arrow-right"
          mode="contained"
          onPress={() => props.onNavigate(RootScreens.ONBOARDING3)}
        >
          Tiếp theo
        </Button>
      </View>
    </View>
  );
};

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
  innerwrapper: {
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    padding: 40,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    marginTop: 10,
    textAlign: "center",
  },
  title: {
    marginTop: 10,
    textAlign: "center",
  },
});
