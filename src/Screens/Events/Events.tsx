import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
import { View,Image, Text, StyleSheet, TouchableHighlight, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { useNavigation } from "@react-navigation/native";
import Timeline from 'react-native-timeline-flatlist';
import { Icon } from "react-native-paper";



export interface IMainProps {
  data: User | undefined;
  isLoading: boolean;
}



export const Events = (props: IMainProps) => {
  const { _data, isLoading } = props;
  const [number, setNumber] = useState(0)
  console.log(navigator);
  const navigation = useNavigation()
  const goHome = ()=>{
    navigation.navigate('Home')
  }
  const data = [
    {time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',lineColor:'#009688', 
      icon: <Image
      style={{width: 25, height: 25}}
      source={{uri:"https://img.icons8.com/emoji/48/graduation-cap-emoji.png"}}/>},
      
    {time: '10:45', 
      title: 'Play Badminton', 
      description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
      icon: <Image
      style={{width: 25, height: 25}}
      source={{uri:"https://img.icons8.com/doodle/48/checkmark.png"}}/>
    },
    {time: '12:00', title: 'Lunch'
      ,
      icon: <Image
      style={{width: 25, height: 25}}
      source={{uri:"https://img.icons8.com/external-kmg-design-outline-color-kmg-design/32/external-processing-arrows-kmg-design-outline-color-kmg-design.png"}}/>
    },
    {time: '14:00', title: 'Watch Soccer',
       description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688',
       icon: <Image
       style={{width: 25, height: 25}}
       source={{uri:"https://img.icons8.com/ios-filled/50/football2.png"}}/>
      },
    {time: '18:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)',
      icon: <Image
      style={{width: 25, height: 25}}
      source={{uri:"https://img.icons8.com/bubbles/100/dumbbell.png"}}/>


    },
    {time: '19:30', title: 'Go Home',
       description: 'Look out for the Best Gym & Fitness Centers around me :)',
       icon: <Image
       style={{width: 20, height: 20}}
       source={{uri:"https://img.icons8.com/emoji/48/pickup-truck-emoji.png"}}/>
      },
    {time: '20:30', title: 'Dinner', description: 'Look out for the Best Gym & Fitness Centers around me :)',
      icon: <Image
      style={{width: 20, height: 20}}
      source={{uri:"https://img.icons8.com/emoji/48/wheel-emoji.png"}}/>
    },
    
  ]
  https://img.icons8.com/bubbles/100/dumbbell.png
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
          {/* <TimelineCalendar viewMode="day"></TimelineCalendar> */}
          <Timeline
            data={data}
            circleSize={20}
            circleColor='rgba(0, 0, 0, 0.1)'
            lineColor='rgba(0,0,255,0.5)'
            timeContainerStyle={{ minWidth: 52 }}
            timeStyle={{
              textAlign: 'center',
              backgroundColor: '#ff9797',
              color: 'white',
              padding: 5,
              borderRadius: 13,
            }}
            descriptionStyle={{ color: 'gray' }}
          
            innerCircle={'icon'}
          />

        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
	  paddingTop:10,
    backgroundColor:'white'
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
  timeline: {
    flex: 1,
  },
});
