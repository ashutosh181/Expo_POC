import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function DetailScreen() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <View>
        <TouchableOpacity onPress={() => {}} style={styles.backIconView}>
          <Image
            source={require("./../assets/arrowDown.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>
      <Text style={{ textAlign: "center" }}>PostScreen Screen</Text>
    </SafeAreaView>
  );
}
export default DetailScreen;
const styles = StyleSheet.create({
  container: { padding: 5 },
  backIcon: { height: 20, width: 20, transform: [{ rotate: "90deg" }] },
  text: { textAlign: "center", fontWeight: "100" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
  backIconView: {
    position: "absolute",
    paddingHorizontal: 5,
  },
});
