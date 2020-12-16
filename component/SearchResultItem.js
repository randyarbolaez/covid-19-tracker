import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import Color from "../constant/Color";

const SearchResultItem = ({ stateAndCountyFromBtn, item }) => {
  let state = Object.keys(item.item)[0];
  let county = Object.values(item.item)[0];
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        stateAndCountyFromBtn({ state, county });
      }}
    >
      <View style={styles.textContainer}>
        <Text style={styles.textState}>{state}</Text>
        <Text style={styles.textCounty}>{county}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    textAlign: "center",
    shadowOffset: { width: 4, height: 3 },
    shadowColor: Color.offBlack,
    shadowOpacity: 0.5,
    marginHorizontal: "15%",
  },
  textContainer: { display: "flex" },
  textState: {
    color: Color.blue,
    fontWeight: "bold",
    fontSize: 16,
    fontSize: 22,
  },
  textCounty: {
    color: Color.blue,
    color: Color.offBlack,
    textAlign: "right",
    fontWeight: "200",
    fontSize: 15,
    fontSize: 18,
  },
});

export default SearchResultItem;
