import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const DropDownComponent = ({ onSelect }) => {
  return (
    <View
      style={{
        elevation: 5,
        alignSelf: "center",
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 7,
      }}
    >
      <FlatList
        data={[
          { name: "item-A" },
          { name: "item-B" },
          { name: "item-C" },
          { name: "item-D" },
        ]}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                width: "85%",
                alignSelf: "center",
                height: 50,
                justifyContent: "center",
                borderBottomWidth: 0.5,
                borderColor: "#8e8e8e",
              }}
              onPress={() => {
                onSelect(item.name);
              }}
            >
              <Text style={{ fontWeight: "600" }}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default DropDownComponent;
