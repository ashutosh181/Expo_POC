const DropDownComponent = () => {
  return (
    <View
      style={{
        elevation: 5,
        marginTop: 20,
        // height: 300,
        alignSelf: "center",
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
      }}
    >
      <FlatList
        data={[
          { name: "iteam-A" },
          { name: "iteam-B" },
          { name: "iteam-C" },
          { name: "iteam-D" },
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
                setSelectedCountry(item.country);
                setClicked(!clicked);
                onSearch("");
                setSearch("");
              }}
            >
              <Text style={{ fontWeight: "600" }}>{item.country}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default DropDownComponent;
