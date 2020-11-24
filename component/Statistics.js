import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Color from "../constant/Color";

const Statistics = ({ stats }) => {
  let { cases = null, confirmed = null } = stats;
  let { deaths = null, recovered = null } = stats;

  cases = typeof cases !== "object" ? cases.toLocaleString() : cases;
  confirmed =
    typeof confirmed !== "object" ? confirmed.toLocaleString() : confirmed;
  deaths = typeof deaths !== "object" ? deaths.toLocaleString() : deaths;
  recovered =
    typeof recovered !== "object" ? recovered.toLocaleString() : recovered;

  return (
    <View style={{ ...styles.container }}>
      <View
        style={{
          ...styles.wrapper,
        }}
      >
        <View
          style={{
            ...styles.wrapperContainer,
            backgroundColor: Color.orange,
          }}
        >
          <Text style={styles.wrapperTitle}>Confirmed</Text>
          <Text style={styles.wrapperStat}>
            {cases || confirmed ? cases || confirmed : "-"}
          </Text>
        </View>
        <View
          style={{
            ...styles.wrapperContainer,
            backgroundColor: Color.red,
          }}
        >
          <Text style={styles.wrapperTitle}>Deaths</Text>
          <Text style={styles.wrapperStat}>{deaths ? deaths : "-"}</Text>
        </View>
        <View
          style={{
            ...styles.wrapperContainer,
            backgroundColor: Color.teal,
          }}
        >
          <Text style={styles.wrapperTitle}>Recovered</Text>
          <Text style={styles.wrapperStat}>{recovered ? recovered : "-"}</Text>
        </View>
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
    flexWrap: "wrap",
    height: "60%",
    marginHorizontal: 10,
  },
  wrapperContainer: {
    height: "100%",
    width: "40%",
    justifyContent: "space-around",
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  wrapperTitle: {
    fontSize: 16,
    color: Color.offBlack,
  },
  wrapperStat: {
    fontSize: 20,
    color: Color.offWhite,
  },
});

export default Statistics;
