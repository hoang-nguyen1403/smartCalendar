import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import { User } from "@/Services";

import * as CalendarEX from "expo-calendar";
import { Calendar, Agenda } from "react-native-calendars";
import {
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RootScreens } from "..";
import { useNavigation } from "@react-navigation/native";

export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
  IHomeProps: any
}

export const Home = (props: IHomeProps) => {
  const { data, isLoading } = props;
  const [events, setEvents] = useState<{
    [date: string]: {
      id: string;
      name: string;
      startDate: Date;
      location?: string;
    }[];
  }>({});
  const [loading, setLoading] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // Yêu cầu quyền truy cập lịch
  async function getCalendarPermission() {
    const { status } = await CalendarEX.requestCalendarPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Lỗi", "Quyền truy cập lịch chưa được cấp!");
      return false;
    }
    return true;
  }

  // Lấy lịch mặc định
  async function getDefaultCalendarSource() {
    const calendars = await CalendarEX.getCalendarsAsync(
      CalendarEX.EntityTypes.EVENT
    );
    const defaultCalendars = calendars.filter((cal) => cal.allowsModifications);
    return defaultCalendars.length > 0 ? defaultCalendars[0] : null;
  }

  async function createEvent() {
    if (!eventTitle.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tiêu đề sự kiện!");
      return;
    }

    try {
      setLoading(true);
      const hasPermission = await getCalendarPermission();
      if (!hasPermission) return;

      const calendar = await getDefaultCalendarSource();
      if (!calendar) {
        Alert.alert("Lỗi", "Không tìm thấy lịch!");
        return;
      }

      const event = {
        title: eventTitle,
        startDate: eventDate,
        endDate: new Date(eventDate.getTime() + 60 * 60 * 1000), // Kết thúc sau 1 giờ
        location: eventLocation || "Không có địa điểm",
        notes: "Sự kiện được tạo từ ứng dụng",
      };

      const eventId = await CalendarEX.createEventAsync(calendar.id, event);
      const dateString = eventDate.toISOString().split("T")[0];
      setEvents((prevEvents) => ({
        ...prevEvents,
        [dateString]: [
          ...(prevEvents[dateString] || []),
          { id: eventId, ...event },
        ],
      }));
      Alert.alert("Thành công", `Sự kiện "${event.title}" đã được tạo!`);
      setEventTitle("");
      setEventLocation("");
      setShowModal(false);
    } catch (error) {
      Alert.alert("Lỗi", `Không thể tạo sự kiện: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function fetchEvents() {
    try {
      setLoading(true);
      const hasPermission = await getCalendarPermission();
      if (!hasPermission) return;

      const calendar = await getDefaultCalendarSource();
      if (!calendar) {
        Alert.alert("Lỗi", "Không tìm thấy lịch!");
        return;
      }

      const fetchedEvents = await CalendarEX.getEventsAsync({
        calendarIds: [calendar.id],
        startDate: new Date(2025, 4, 1), // Từ 01/05/2025
        endDate: new Date(2025, 4, 31), // Đến 31/05/2025
      });

      const eventsByDate: { [date: string]: CalendarEX.Event[] } = {};
      fetchedEvents.forEach((event) => {
        const dateString = new Date(event.startDate)
          .toISOString()
          .split("T")[0];
        if (!eventsByDate[dateString]) {
          eventsByDate[dateString] = [];
        }
        eventsByDate[dateString].push(event);
      });

      setEvents(eventsByDate);
    } catch (error) {
      Alert.alert("Lỗi", `Không thể lấy sự kiện: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   getCalendarPermission();
  //   fetchEvents();
  // }, []);

  // Xử lý khi chọn ngày
  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const renderItem = (item: CalendarEX.Event) => (
    <Card style={styles.eventCard}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>
          {new Date(item.startDate).toLocaleTimeString()} -{" "}
          {item.location || "Không có địa điểm"}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  const navigation = useNavigation()
  const goLogin = () => {
    props.onNavigate(RootScreens.LOGIN)
  }

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <View style={styles.iconLayout}>
          <IconButton
            icon={"account"}
            onPress={() => goLogin()}
            style={styles.createBtn}
            size={24}
          ></IconButton>
          <Text>Hello User</Text>
        </View>
        
        <IconButton
          icon={"plus"}
          onPress={() => setShowModal(true)}
          style={styles.createBtn}
          size={24}
        ></IconButton>
      </View>

      <Calendar
        onDayPress={onDayPress}
        markedDates={Object.keys(events).reduce(
          (acc, date) => ({
            ...acc,
            [date]: { marked: true, dotColor: "#50cebb" },
          }),
          {}
        )}
        style={styles.calendar}
        theme={{
          selectedDayBackgroundColor: "#50cebb",
          todayTextColor: "#50cebb",
          arrowColor: "#50cebb",
        }}
      />
      <View>
        <Text style={styles.title}>
          {eventDate.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
      </View>

      <Card style={styles.eventCard}>
        <Card.Content>
          {/* <Title style={styles.event}>TaskName</Title> */}
          <View style={styles.topbar}>
          <Paragraph style={styles.event}>
            No Event
          </Paragraph>
          <Paragraph style={styles.event}>
            18h
          </Paragraph>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.eventCard1}>
        <Card.Content>
          {/* <Title style={styles.event}>TaskName</Title> */}
          <View style={styles.topbar}>
          <Paragraph style={styles.event1}>
            Meeting
          </Paragraph>
          <Paragraph style={styles.event1}>
            15h30 - 17h00
          </Paragraph>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.eventCard2}>
        <Card.Content>
          {/* <Title style={styles.event}>TaskName</Title> */}
          <View style={styles.topbar}>
          <Paragraph style={styles.event2}>
            John' Birthday
          </Paragraph>
          <Paragraph style={styles.event2}>
            All day
          </Paragraph>
          </View>
        </Card.Content>
      </Card>
      <Card style={styles.eventCard3}>
        <Card.Content>
          {/* <Title style={styles.event}>TaskName</Title> */}
          <View style={styles.topbar}>
          <Paragraph style={styles.event3}>
            Dinner
          </Paragraph>
          <Paragraph style={styles.event3}>
            19h
          </Paragraph>
          </View>
        </Card.Content>
      </Card>

      {selectedDate && events[selectedDate] && (
        <Agenda
          items={events}
          selected={selectedDate}
          renderItem={renderItem}
          renderEmptyData={() => (
            <Paragraph style={styles.event}>Không có sự kiện nào</Paragraph>
          )}
          style={styles.agenda}
        />
      )}

      {/* Modal để thêm sự kiện */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Title>Thêm sự kiện mới</Title>
            <TextInput
              label="Tiêu đề sự kiện"
              value={eventTitle}
              onChangeText={setEventTitle}
              style={styles.input}
              mode="outlined"
              disabled={loading}
            />
            <TextInput
              label="Địa điểm"
              value={eventLocation}
              onChangeText={setEventLocation}
              style={styles.input}
              mode="outlined"
              disabled={loading}
            />
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.datePickerButton}
            >
              <Text style={styles.datePickerText}>
                {eventDate.toLocaleString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={eventDate}
                mode="datetime"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setEventDate(selectedDate);
                }}
              />
            )}
            <View style={styles.modalButtons}>
              <Button mode="contained" onPress={createEvent} disabled={loading}>
                Tạo
              </Button>
              <Button
                mode="outlined"
                onPress={() => setShowModal(false)}
                disabled={loading}
              >
                Hủy
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  calendar: {
    marginBottom: 20,
    borderRadius: 10,
  },
  agenda: {
    flex: 1,
  },

  
  noEvents: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  input: {
    marginBottom: 10,
  },
  datePickerButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: "#333",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  topbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  createBtn: {
    borderRadius: 30, // Làm tròn = 1/2 chiều rộng/chiều cao
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Đổ bóng Android
    shadowColor: "#000", // Đổ bóng iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    fontSize: 30,
    backgroundColor: "#C3D0FA",
    color: "#3F15EA",
  },
  createBtn1: {
    backgroundColor: "green",
    color: "#3F15EA",
    padding: 0,
    margin: 0,
  },
  title: {
    fontSize: 20,
    // backgroundColor: "#C3D0FA",
    padding: 10,
  },
  eventCard: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#FCBDF2",
    color: "#EA15BB"
  },
  event:{
    color: '#EA15BB'
  },
  eventCard1: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#FCC8BD",
  },
  event1:{
    color: '#EA1515'
  }
  ,
  eventCard2: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#BDD0FC",
  },
  event2:{
    color: '#3F15EA'
  },
  eventCard3: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#B4F0B6",
  },
  event3:{
    color: '#008404'
  },
  iconLayout: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
});
