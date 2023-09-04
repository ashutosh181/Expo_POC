import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Table, Row } from "react-native-table-component";

const ExampleThree = () => {
  const navigation = useNavigation();
  const [tableHead] = useState([
    "Event description",
    "po number",
    "po item",
    "vessel number",
  ]);

  const widthArr = [120, 120, 120, 120];

  const data = [
    {
      id: 1,
      ED: "This is Fake Data",
      PN: 100000,
      PI: 20,
      VN: 4075678678,
    },
    {
      id: 2,
      ED: "This is Fake Data",
      PN: 200000,
      PI: 30,
      VN: 4878678670,
    },
    {
      id: 3,
      ED: "This is Fake Data",
      PN: 300000,
      PI: 80,
      VN: 40684856,
    },
    {
      id: 4,
      ED: "This is Fake Data",
      PN: 400000,
      PI: 90,
      VN: 47567556,
    },
    {
      id: 5,
      ED: "This is Fake Data",
      PN: 500000,
      PI: 60,
      VN: 4567565670,
    },
  ];

  const tableData = data.map((item) => [item.ED, item.PN, item.PI, item.VN]);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView
            style={styles.dataWrapper}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              {tableData.map((rowData, index) => (
                <TouchableOpacity
                  onPress={() => {
                    const data = {
                      ED: rowData[0],
                      PN: rowData[1],
                      PI: rowData[2],
                      VN: rowData[3],
                    };
                    navigation.navigate("Post", { data });
                  }}
                >
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={widthArr}
                    style={[
                      styles.row,
                      index % 2 && { backgroundColor: "#F7F6E7" },
                    ]}
                    textStyle={styles.text}
                  />
                </TouchableOpacity>
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 5 },
  header: { height: 50, backgroundColor: "#537790" },
  text: {
    textAlign: "center",
  },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
});

export default ExampleThree;
