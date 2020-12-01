import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import HeatMapNav from "../component/HeatMapNav";

import Color from "../constant/Color";

const HeatMapScreen = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.navWrapper}>
        <HeatMapNav navigation={props.navigation} />
      </View>
      <View style={styles.heatMapWrapper}>
        <Text>HeatMapScreen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flex: 1,
    justifyContent: "flex-start",
  },
  navWrapper: {
    height: "5%",
    marginTop: "10%",
  },
  heatMapWrapper: {},
});

export default HeatMapScreen;
