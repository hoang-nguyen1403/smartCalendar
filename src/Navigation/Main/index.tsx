import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";

import { Icon } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { TasksContainer } from "@/Screens/Tasks";
import { EventsContainer } from "@/Screens/Events";
import { NotificationContainer } from "@/Screens/Notification";


const Tab = createBottomTabNavigator();

// @refresh reset
export const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          headerShown: false,  
          tabBarLabel: () => null, // Ẩn label
          tabBarIcon:({color, size}) =>(
            <Ionicons name="calendar" size={22} color="gray" />
          )
        }}
      />
      <Tab.Screen
        name="Task"
        component={TasksContainer}
        options={{
          headerShown: false,  
          tabBarLabel: () => null, // Ẩn label
          tabBarIcon:({color, size}) =>(
            <Ionicons name="checkmark-circle-outline" size={22} color="gray" />
          )
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsContainer}
        options={{
          tabBarLabel: () => null, // Ẩn label
          tabBarIcon:({color, size}) =>(
            <Icon source="chart-bubble"
            color="gray" 
            size={22} ></Icon>
          )
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationContainer}
        options={{
          tabBarLabel: () => null, // Ẩn label
          headerShown: false,  
          tabBarIcon:({color, size}) =>(
            <Ionicons name="notifications" size={22} color="gray" />
          )
        }}
      />
    </Tab.Navigator>
  );
};
