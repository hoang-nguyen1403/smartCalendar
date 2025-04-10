import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { useNavigation } from "@react-navigation/native";

export interface IMainProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Page1 = (props: IMainProps) => {
  const { data, isLoading } = props;
  const [number, setNumber] = useState(0)
  console.log(navigator);
  const navigation = useNavigation()
  const goHome = ()=>{
    navigation.navigate('Home')
  }
  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <>
        <View style={styles.main_item}>
          
          <TouchableHighlight 
          style={styles.column1} 
          underlayColor="white"
          onPress={()=>{setNumber(number+1)}}>
              <Text style={styles.text} >Hiện Tại</Text>
          </TouchableHighlight>
          
          <View  style={styles.column1}>
            <Button title="Đã đi" onPress={goHome}/>        
          </View>
          <View style={styles.column1}>
            <Text >Đã Huỷ</Text>
          </View>
        </View>
        <View>
        </View>
        <Text>{number}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  main_item: {
    width: "100%",
    height: "10%",
    margin: 10,
    display: "flex",
    flewWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    color: '#FF9598'
  },
  column1: {
    // flex: 1,
    fontSize: 18,
    padding: 10,
    margin: 4,
    lineHeight: 12,
    backgroundColor: '#FF9598',
    backgroundPosition: "center",
    borderColor: '#0099AA',
    borderWidth: 2,
    borderRadius: 10
  },
  text:{
    color: "black"
  },
});
