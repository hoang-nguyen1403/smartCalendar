import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Button, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { useNavigation } from "@react-navigation/native";
import {
  IconButton,
} from "react-native-paper";

export interface IMainProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Tasks = (props: IMainProps) => {
  const { data, isLoading } = props;
  const [eventDate, setEventDate] = useState(new Date());

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
        <View style={styles.container}>
          <Text style={styles.title}>Tasks for Today</Text>
          <View>
            <Text style={styles.subtitle}>
              {eventDate.toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })} 
            </Text>
          </View>
          <ScrollView>
              <View style={styles.event}>
                <View>
                  <Text style={styles.eventText}>
                      No Event 
                  </Text>
                  <Text style={styles.time}>Time: 18h</Text>
                </View>
                <View style={styles.rightColumn}>
                <IconButton
                    icon={"check"}
                    onPress={() => setShowModal(true)}
                    style={styles.doneBtn}
                    iconColor= { '#008404'}
                    size={24}
                  ></IconButton>
                  <IconButton
                    icon={"delete"}
                    onPress={() => setShowModal(true)}
                    style={styles.removeBtn}
                    iconColor= {"red"}
                    size={24}
                  ></IconButton>
                </View>
                
              </View>

              <View style={styles.event}>
                <View>
                  <Text style={styles.eventText}>
                      Meeting
                  </Text>
                  <Text style={styles.time}>Time: 15h30 - 17h</Text>
                </View>
                <View style={styles.rightColumn}>
                <IconButton
                    icon={"check"}
                    onPress={() => setShowModal(true)}
                    style={styles.doneBtn}
                    iconColor= { '#008404'}
                    size={24}
                  ></IconButton>
                  <IconButton
                    icon={"delete"}
                    onPress={() => setShowModal(true)}
                    style={styles.removeBtn}
                    iconColor= {"red"}
                    size={24}
                  ></IconButton>
                </View>
                
              </View>

              <View style={styles.event}>
                <View>
                  <Text style={styles.eventText}>
                     John's Birthday 
                  </Text>
                  <Text style={styles.time}>Time: All Day</Text>
                </View>
                <View style={styles.rightColumn}>
                <IconButton
                    icon={"check"}
                    onPress={() => setShowModal(true)}
                    style={styles.doneBtn}
                    iconColor= { '#008404'}
                    size={24}
                  ></IconButton>
                  <IconButton
                    icon={"delete"}
                    onPress={() => setShowModal(true)}
                    style={styles.removeBtn}
                    iconColor= {"red"}
                    size={24}
                  ></IconButton>
                </View>
                
              </View>

              <View style={styles.event}>
                <View>
                  <Text style={styles.eventText}>
                      Dinner
                  </Text>
                  <Text style={styles.time}>Time: 19h</Text>
                </View>
                <View style={styles.rightColumn}>
                <IconButton
                    icon={"check"}
                    onPress={() => setShowModal(true)}
                    style={styles.doneBtn}
                    iconColor= { '#008404'}
                    size={24}
                  ></IconButton>
                  <IconButton
                    icon={"delete"}
                    onPress={() => setShowModal(true)}
                    style={styles.removeBtn}
                    iconColor= {"red"}
                    size={24}
                  ></IconButton>
                </View>
                
              </View>
          </ScrollView>
          
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
    backgroundColor: "#f5f5f5",
  },
  main_item: {
    width: "100%",
    height: "10%",
    margin: 10,
    display: "flex",
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
    borderColor: '#0099AA',
    borderWidth: 2,
    borderRadius: 10
  },
  text:{
    color: "black"
  },
  title:{
    color: "black",
    fontSize: 30
  },
  subtitle:{
    color: "gray",
    fontSize: 18
  },
  event:{
    display: "flex",
    padding: 2,
    paddingLeft: 0,
    marginTop:10,
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center",
    borderColor: "gray",
    borderTopColor: "lightgray",
    borderTopWidth: 2


  },
  eventText:{
    fontSize: 18,
  },
  removeBtn: {
    backgroundColor:  "#FCC8BD",
    color: '#3F15EA',
    borderColor: '#0099AA',
    borderRadius: 20,
    fontSize: 10,
  },
  doneBtn: {
    backgroundColor:  "#B4F0B6",
    borderColor: "#B4F0B6",
    borderRadius: 20,
    fontSize: 10,
  },
  rightColumn: {
    display:"flex",
    flexDirection:"row",
    padding: 0
  },
  time:{
    color: "gray",
  },

});
