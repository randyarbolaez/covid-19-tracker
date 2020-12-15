import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SearchResultItem = ({ stateAndCountyFromBtn, item }) => {
  let state = Object.keys(item.item)[0];
  let county = Object.values(item.item)[0];
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          stateAndCountyFromBtn({ state, county });
        }}
      >
        <Text style={{ borderRadius: 10, borderColor: "red", borderWidth: 2 }}>
          {state} - {county}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchResultItem;
