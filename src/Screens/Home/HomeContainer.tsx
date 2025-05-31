import { Home } from "./Home";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreens } from "..";
import { RootStackParamList } from "@/Navigation";

type MainNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.MAIN
>;

export const HomeContainer = ({navigation}:MainNavigatorProps) => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);


  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };


  return <Home data={data} isLoading={isLoading} onNavigate={onNavigate} />;
};
