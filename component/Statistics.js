import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Statistics = ({ stateStats, countyStats, countryStats }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          <Text>Confirmed:{stateStats.cases ? stateStats.cases : "-"}</Text>
          <Text>Deaths:{stateStats.deaths ? stateStats.deaths : "-"}</Text>
          <Text>
            Recovered: {stateStats.recovered ? stateStats.recovered : "-"}
          </Text>
        </View>
        <View>
          <Text>
            Confirmed:{countyStats.confirmed ? countyStats.confirmed : "-"}
          </Text>
          <Text>Deaths:{countyStats.deaths ? countyStats.deaths : "-"}</Text>
          <Text>Recovered: -</Text>
        </View>
      </View>
      <View style={styles.countryStatsWrapperText}>
        <Text>Confirmed:{countryStats.cases ? countryStats.cases : "-"}</Text>
        <Text>Deaths:{countryStats.deaths ? countryStats.deaths : "-"}</Text>
        <Text>
          Recovered: {countryStats.recovered ? countryStats.recovered : "-"}
        </Text>
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
    justifyContent: "space-between",
  },
  countryStatsWrapperText: {
    alignItems: "center",
    marginTop: "5%",
  },
});

export default Statistics;
