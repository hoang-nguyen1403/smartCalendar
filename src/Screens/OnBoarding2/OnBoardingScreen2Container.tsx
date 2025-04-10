import React from "react";
import { OnBoardingScreen2 } from "./OnBoardingScreen2";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type OnBoarding1NavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.ONBOARDING1
>;

export const OnBoarding2ScreenContainer = ({
  navigation,
}: OnBoarding1NavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <OnBoardingScreen2 onNavigate={onNavigate} />;
};
