import React, { useState, useEffect } from "react";
import { View, Text, Picker, StyleSheet } from "react-native";

import Data from "../constant/Data";

const Dropdown = () => {
  const [state, setState] = useState("Alabama");
  const [county, setCounty] = useState("Autauga");
  const [countyStats, setCountyStats] = useState("");
  const [stateStats, setStateStats] = useState("");

  const getCorrectCountyStats = (countiesWithTheSameName) => {
    for (let i = 0; i < countiesWithTheSameName.length; i++) {
      if (countiesWithTheSameName[i].province == state) {
        setCountyStats(countiesWithTheSameName[i].stats);
      }
    }
  };

  const getData = () => {
    fetch(`https://disease.sh/v3/covid-19/states/${state}`)
      .then((res) => res.json())
      .then((stats) => setStateStats(stats));
    fetch(`https://disease.sh/v3/covid-19/jhucsse/counties/${county}`)
      .then((res) => res.json())
      .then((stats) => getCorrectCountyStats(stats));
  };

  useEffect(() => {
    return getData();
  }, [state, county]);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={state}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) => {
          setCounty(Data[itemValue][0]);
          setState(itemValue);
        }}
      >
        {Object.keys(Data).map((state) => {
          return <Picker.Item label={state} value={state} key={state} />;
        })}
      </Picker>
      <Picker
        selectedValue={county}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) => setCounty(itemValue)}
      >
        {Data[state].map((county) => {
          return <Picker.Item label={county} value={county} key={county} />;
        })}
      </Picker>
      <View>
        <Text>
          Confirmed:{countyStats.confirmed ? countyStats.confirmed : "-"}
        </Text>
        <Text>Deaths:{countyStats.deaths ? countyStats.deaths : "-"}</Text>
        <Text>Recovered: -</Text>
        <Text>State v</Text>
        <Text>Confirmed:{stateStats.cases ? stateStats.cases : "-"}</Text>
        <Text>Deaths:{stateStats.deaths ? stateStats.deaths : "-"}</Text>
        <Text>
          Recovered: {stateStats.recovered ? stateStats.recovered : "-"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
});

export default Dropdown;
