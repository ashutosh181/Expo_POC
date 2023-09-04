import React from "react";
import { Modal, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

function CalendarComponent({ isVisible, onSelectDate }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Calendar
        style={{}}
        onDayPress={(day) => {
          console.log("selected day", day);
          onSelectDate(day);
        }}
      />
    </View>
  );
}
export default CalendarComponent;
