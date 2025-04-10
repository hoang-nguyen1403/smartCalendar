import React from "react";
import { OnBoardingScreen1 } from "./OnBoardingScreen1";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type OnBoarding1NavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.ONBOARDING1
>;

export const OnBoarding1ScreenContainer = ({
  navigation,
}: OnBoarding1NavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <OnBoardingScreen1 onNavigate={onNavigate} />;
};
