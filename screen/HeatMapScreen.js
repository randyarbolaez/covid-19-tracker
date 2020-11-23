import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import Color from "../constant/Color";

const HeatMapScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>HeatMapScreen</Text>
      <Button
        title="Home"
        onPress={() => {
          props.navigation.navigate("Home");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HeatMapScreen;
