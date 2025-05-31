import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./Main";
import { WelcomeContainer } from "@/Screens/Welcome";

import { RootScreens } from "@/Screens";
import { OnBoarding1ScreenContainer } from "@/Screens/OnBoarding1";
import { OnBoarding2ScreenContainer } from "@/Screens/OnBoarding2";
import { OnBoarding3ScreenContainer } from "@/Screens/OnBoarding3";
import { LoginContainer } from "@/Screens/Login/LoginContainer"; 

import {useState, useEffect} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SignInContainer } from "@/Screens/SignIn";

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.WELCOME]: undefined;
  [RootScreens.ONBOARDING1]: undefined;
  [RootScreens.ONBOARDING2]: undefined;
  [RootScreens.ONBOARDING3]: undefined;
  [RootScreens.LOGIN]: undefined;
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const [firstTimeLoad, setFirstTimeLoad] =  useState(true)

  const getFirstTimeLoadValue = async () =>{
    const result = await AsyncStorage.getItem("firstTimeLoad")
    console.log("firstTimeLoad ----", result);
    if(result == "true" || result == null ){
      setFirstTimeLoad(true)
    }else{
      setFirstTimeLoad(false)
    }

  }
  useEffect(()=>{
    getFirstTimeLoadValue()
  }, [])
  return (
    <NavigationContainer>
      <StatusBar />
      {firstTimeLoad ? 
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen
          name={RootScreens.WELCOME}
          component={WelcomeContainer}
        />
         <RootStack.Screen
          name={RootScreens.ONBOARDING1}
          component={OnBoarding1ScreenContainer}
        />
         <RootStack.Screen
          name={RootScreens.ONBOARDING2}
          component={OnBoarding2ScreenContainer}
        />
         <RootStack.Screen
          name={RootScreens.ONBOARDING3}
          component={OnBoarding3ScreenContainer}
        />
        <RootStack.Screen
          name={RootScreens.MAIN}
          component={MainNavigator}
          options={{}}
        />
        <RootStack.Screen
          name={RootScreens.LOGIN}
          component={LoginContainer}
        />
        <RootStack.Screen
          name={RootScreens.SIGNIN}
          component={SignInContainer}
        />
      </RootStack.Navigator>
      :

      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen
          name={RootScreens.MAIN}
          component={MainNavigator}
          options={{}}
        />
        <RootStack.Screen
          name={RootScreens.LOGIN}
          component={LoginContainer}
        />
        <RootStack.Screen
          name={RootScreens.SIGNIN}
          component={SignInContainer}
        />
      </RootStack.Navigator>
      
      } 
      
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
