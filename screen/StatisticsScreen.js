import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Dropdown from "../component/Dropdown";

import Color from "../constant/Color";

const StatisticsScreen = () => {
  return (
    <View style={styles.container}>
      <Dropdown />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StatisticsScreen;
