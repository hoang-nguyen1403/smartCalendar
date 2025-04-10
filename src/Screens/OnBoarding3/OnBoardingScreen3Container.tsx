import React from "react";
import { OnBoardingScreen3 } from "./OnBoardingScreen3";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type OnBoarding1NavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.ONBOARDING2
>;

export const OnBoarding3ScreenContainer = ({
  navigation,
}: OnBoarding1NavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <OnBoardingScreen3 onNavigate={onNavigate} />;
};
