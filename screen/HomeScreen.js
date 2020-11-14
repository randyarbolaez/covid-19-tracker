import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import Color from "../constant/Color";

const HomeScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button
        title="HeatMap"
        onPress={() => {
          props.navigation.navigate("HeatMap");
        }}
      />
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

export default HomeScreen;
