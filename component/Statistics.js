import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Statistics = ({ stats }) => {
  let { cases = null, confirmed = null } = stats;
  let { deaths, recovered } = stats;

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text>Confirmed:{cases || confirmed ? cases || confirmed : "-"}</Text>
        <Text>Deaths:{deaths ? deaths : "-"}</Text>
        <Text>Recovered: {recovered ? recovered : "-"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default Statistics;
