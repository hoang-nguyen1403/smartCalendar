import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { useNavigation } from "@react-navigation/native";
import {
  IconButton,
  MD3Colors,
} from "react-native-paper";


export interface IMainProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Notification = (props: IMainProps) => {
  const { data, isLoading } = props;
  const [number, setNumber] = useState(0)
  console.log(navigator);
  const navigation = useNavigation()
  const goHome = ()=>{
    navigation.navigate('Home')
  }

  const notifications = [
    {
      id: '1',
      title: 'Notification',
      message: 'No event is coming in next 10 mins.',
      time: '2 min ago',
      icon: 'mail-outline',
    },
    {
      id: '2',
      title: 'Reminder',
      message: 'Don\'t forget your dinner',
      time: '10 min ago',
      icon: 'calendar-outline',
    },
    {
      id: '3',
      title: 'Reminder',
      message: 'Today is John\'s birthday.',
      time: '1 hour ago',
      icon: 'calendar-outline',
    },
  ];
  const NotificationItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <IconButton icon={item.icon} size={30}/>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Notifications</Text>
          <FlatList
            data={notifications}
            renderItem={({ item }) => <NotificationItem item={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
      </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    elevation: 1,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#111827',
  },
  message: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 10,
  },
  separator: {
    height: 10,
  },
});
