import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Color from "../constant/Color";

const HeatMapNav = (props) => {
  return (
    <View style={styles.container}>
      <AntDesign
        name="arrowleft"
        size={24}
        color={Color.white}
        onPress={() => props.navigation.goBack()}
      />
      <Text style={styles.title}>Heat Map</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0)",
    marginHorizontal: 20,
    alignItems: "baseline",
    position: "absolute",
    marginTop: 50,
  },
  title: {
    color: Color.white,
    fontSize: 18,
    fontWeight: "bold",
    width: "55%",
    textAlign: "right",
  },
});

export default HeatMapNav;
