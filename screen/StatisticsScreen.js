import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Dropdown from "../component/Dropdown";
import Chart from "../component/Chart";

import Color from "../constant/Color";

const StatisticsScreen = (props) => {
  const [nameOfLand, setNameOfLand] = useState("");
  const [typeOfLand, setTypeOfLand] = useState("");
  const callbackFunction = (nameInfo, landInfo) => {
    setNameOfLand(nameInfo);
    setTypeOfLand(landInfo);
  };
  return (
    <View style={styles.container}>
      <Dropdown parentCallback={callbackFunction} />
      <View style={styles.chart}>
        <Chart nameOfLand={nameOfLand} typeOfLand={typeOfLand} />
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
