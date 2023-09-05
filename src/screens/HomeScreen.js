import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import TableComponent from "../component/TableComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarComponent from "../component/CalendarComponent";
import { calendarIcon } from "../utils/images";

function HomeScreen() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateType, setdateType] = useState("end");
  const [startDate, setStartDate] = useState("22/10/2023");
  const [endDate, setEndDate] = useState("22/10/2023");

  function formatDate(inputDate) {
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
      return (
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20 }}>Unloads</Text>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.headerText}>
          Plant: <Text style={styles.subHeaderText}>US01</Text>
        </Text>
        <Text style={styles.headerText}>
          Language: <Text style={styles.subHeaderText}>en</Text>
        </Text>
      </View>
      <View style={styles.findView}>
        <TextInput
          style={styles.findInput}
          placeholder="Find"
          placeholderTextColor={"#000000"}
        />
        <View style={styles.findSubView}>
          <Image
            source={require("./../assets/searchIcon.png")}
            style={styles.searchIcon}
          />
          <Image
            source={require("./../assets/arrowDown.png")}
            style={styles.searchIcon}
          />
        </View>
      </View>
      <View style={styles.mot}>
        <View style={styles.subMot}>
          <Text>MOT</Text>
          <View style={styles.motView}>
            <Text>ALL</Text>
            <Image
              source={require("./../assets/arrowDown.png")}
              style={styles.searchIcon}
            />
          </View>
        </View>
        <View style={styles.subMot}>
          <Text>Plant Area</Text>

          <View style={styles.motView}>
            <Text>ALL</Text>
            <Image
              source={require("./../assets/arrowDown.png")}
              style={styles.searchIcon}
            />
          </View>
        </View>
      </View>
      <View style={styles.mot}>
        <View style={styles.subMot}>
          <Text>Start Date</Text>
          <TouchableOpacity
            style={styles.motView}
            onPress={() => {
              setdateType("start");
              setShowCalendar(true);
            }}
          >
            <Text>{startDate}</Text>
            <Image source={calendarIcon} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.subMot}>
          <Text>End Date</Text>
          <TouchableOpacity
            style={styles.motView}
            onPress={() => {
              setdateType("end");
              setShowCalendar(true);
            }}
          >
            <Text>{endDate}</Text>
            <Image source={calendarIcon} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <TableComponent />
      {showCalendar && (
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => {
            setShowCalendar(false);
          }}
        >
          <Modal visible={showCalendar} transparent={true}>
            <CalendarComponent
              isVisible={showCalendar}
              onSelectDate={(date) => {
                const val = formatDate(date?.dateString);
                setShowCalendar(false);
                if (dateType === "start") {
                  setStartDate(val);
                } else {
                  setEndDate(val);
                }
              }}
            />
          </Modal>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
}
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4ede6",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  header: { alignItems: "center", marginTop: 5 },
  findView: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 30,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 5,
    justifyContent: "space-between",
    padding: 5,
    flexDirection: "row",
  },
  calendarIcon: {
    backgroundColor: "#FFFFFF",
    width: 20,
    height: 20,
    position: "absolute",
    right: 2,
    top: 1,
  },
  findSubView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  searchIcon: {
    width: 18,
    height: 18,
  },
  motView: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 25,
    alignSelf: "center",
    borderRadius: 4,
    justifyContent: "space-between",
    padding: 5,
    flexDirection: "row",
  },
  mot: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  saveBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    backgroundColor: "#a3c284",
    height: 25,
  },
  headerText: {
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "500",
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
    alignSelf: "center",
  },
  subMot: {
    width: "48%",
  },
  durationView: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  subHeaderText: { fontWeight: "200" },
  findInput: {
    flex: 1,
    marginEnd: 10,
  },
});
