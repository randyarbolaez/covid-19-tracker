import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Dropdown from "../component/Dropdown";
import Chart from "../component/Chart";

import Color from "../constant/Color";

const StatisticsScreen = (props) => {
  const [nameOfLand, setNameOfLand] = useState("");
  const [typeOfLand, setTypeOfLand] = useState("");
  const [showChart, setShowChart] = useState(true);

  const infoFromDropdownComponentFunction = (nameInfo, landInfo) => {
    setNameOfLand(nameInfo);
    setTypeOfLand(landInfo);
  };

  const showChartFunction = (boolean) => {
    setShowChart(boolean);
  };

  return (
    <View style={styles.container}>
      <Dropdown
        showChart={showChartFunction}
        infoFromDropdownComponent={infoFromDropdownComponentFunction}
      />
      {showChart && (
        <View style={styles.chart}>
          <Chart nameOfLand={nameOfLand} typeOfLand={typeOfLand} />
        </View>
      )}
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
