import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import HeatMapNav from "../component/HeatMapNav";
import HeatMap from "../component/HeatMap";

import Color from "../constant/Color";

const HeatMapScreen = (props) => {
  return (
    <View style={styles.container}>
      <HeatMap />
      <HeatMapNav navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
});

export default HeatMapScreen;
