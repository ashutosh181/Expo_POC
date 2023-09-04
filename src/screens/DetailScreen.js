import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function DetailScreen({ navigation, route }) {
  const { data } = route.params;
  useEffect(() => {}, []);
  const navList = [
    {
      id: 1,
      icon: require("./../assets/calendarIcon.png"),
      Selected: false,
      name: "Event",
    },
    {
      id: 2,
      icon: require("./../assets/calendarIcon.png"),
      Selected: false,
      name: "Comments",
    },
    {
      id: 3,
      icon: require("./../assets/calendarIcon.png"),
      Selected: false,
      name: "Arrival",
    },
    {
      id: 4,
      icon: require("./../assets/calendarIcon.png"),
      Selected: false,
      name: "1st Waight",
    },
    {
      id: 5,
      icon: require("./../assets/calendarIcon.png"),
      Selected: true,
      name: "Unload",
    },
    {
      id: 6,
      icon: require("./../assets/calendarIcon.png"),
      Selected: false,
      name: "1st Waight",
    },
    {
      id: 7,
      icon: require("./../assets/calendarIcon.png"),
      Selected: false,
      name: "Departure",
    },
    {
      id: 8,
      icon: require("./../assets/calendarIcon.png"),
      Selected: false,
      name: "Completed in ECC",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemView}>
        <View
          style={[
            styles.itemIconView,
            { backgroundColor: !item.Selected ? "#FFFFFF" : "#a4cded" },
          ]}
        >
          <Image
            source={item.icon}
            style={[
              styles.listIcon,
              { tintColor: item.Selected ? "#FFFFFF" : "#a4cded" },
            ]}
          />
        </View>
        <Text style={{ textAlign: "center" }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backIconView}
        >
          <Image
            source={require("./../assets/arrowDown.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {data.PN}:{data.PI}
        </Text>
      </View>
      <ScrollView bounces={false} style={{ paddingBottom: 100 }}>
        <View style={styles.listView}>
          <FlatList
            bounces={false}
            data={navList}
            renderItem={renderItem}
            numColumns={4}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View
          style={{
            width: "95%",
            height: 50,
            backgroundColor: "#6a6e69",
            alignSelf: "center",
            marginVertical: 10,
          }}
        >
          <Image />
        </View>
        <View style={{ marginHorizontal: 10, paddingBottom: 10 }}>
          <View style={styles.inputView}>
            <Text>PO Number</Text>
            <TextInput value={data.PN} style={styles.textInput} />
          </View>
          <View style={styles.inputView}>
            <Text>PO Item</Text>
            <TextInput value={data.PN} style={styles.textInput} />
          </View>
          <View style={styles.inputView}>
            <Text>Material Desc</Text>
            <TextInput value={data.PN} style={styles.textInput} />
          </View>
          <View style={styles.inputView}>
            <Text>Material Desc</Text>
            <View style={styles.dropDownInput}>
              <Image
                source={require("./../assets/calendarIcon.png")}
                style={styles.calIcon}
              />
            </View>
          </View>
          <View style={styles.inputView}>
            <Text>Date of Manufacturing</Text>
            <View style={styles.dropDownInput}></View>
          </View>
          <View style={styles.inputView}>
            <Text>vessel Number</Text>
            <TextInput style={styles.dropDownInput} />
          </View>
          <View style={styles.inputView}>
            <Text>vessel Location</Text>
            <TextInput style={styles.dropDownInput} />
          </View>
          <View style={styles.inputView}>
            <Text>Vendor Oder Quantity </Text>
            <TextInput style={styles.dropDownInput} />
          </View>
          <View style={styles.inputView}>
            <Text>Unit of Measure</Text>
            <TextInput style={styles.dropDownInput} />
          </View>
          <View style={styles.inputView}>
            <Text>Delivery Number/Note</Text>
            <TextInput style={styles.dropDownInput} />
          </View>
          <View style={styles.inputView}>
            <Text>Late Reason</Text>
            <TextInput style={styles.dropDownInput} />
          </View>
          <View style={styles.submmitView}>
            <TouchableOpacity style={styles.btnView}>
              <Text>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnView}>
              <Text>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default DetailScreen;
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  backIcon: { height: 18, width: 18, transform: [{ rotate: "90deg" }] },
  text: { textAlign: "center", fontWeight: "100" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
  backIconView: {},
  headerView: {
    marginVertical: 5,
    flexDirection: "row",
    marginHorizontal: 10,
  },
  listIcon: { height: 30, width: 30 },
  itemIconView: {
    borderRadius: 40,
    borderWidth: 1,
    padding: 20,
    borderColor: "#9bf2d5",
  },
  textInput: {
    color: "black",
    borderColor: "#000000",
    borderWidth: 0.2,
    backgroundColor: "#cccccc",
    borderRadius: 3,
    height: 25,
  },
  inputView: { gap: 3, marginTop: 10 },
  listView: { backgroundColor: "#e4ede6", marginVertical: 20 },
  dropDownInput: {
    color: "black",
    borderColor: "#000000",
    borderWidth: 0.5,
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
    height: 25,
    alignItems: "center",
  },
  calIcon: {
    width: 20,
    height: 20,
    alignSelf: "flex-end",
    marginEnd: 10,
  },
  submmitView: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
    gap: 20,
  },
  btnView: {
    backgroundColor: "#bfbfbf",
    paddingVertical: 5,
    paddingHorizontal: 50,
    borderRadius: 3,
  },
  itemView: {
    width: "22%",
    margin: 5,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
});
