import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Color from "../constant/Color";

const InformationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>InformationScreen</Text>
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

export default InformationScreen;
