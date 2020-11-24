import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Dropdown from "../component/Dropdown";
import Chart from "../component/Chart";

import Color from "../constant/Color";

const StatisticsScreen = () => {
  return (
    <View style={styles.container}>
      <Dropdown />
      <View style={styles.chart}>
        <Chart />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: Color.white,
    flex: 1,
  },
  chart: {
    height: "40%",
    alignItems: "center",
    marginTop: 10,
  },
});

export default StatisticsScreen;
