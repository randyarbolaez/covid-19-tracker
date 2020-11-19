import React, { useState, useEffect } from "react";
import { View, Text, Picker, StyleSheet } from "react-native";

import Data from "../constant/Data";
import Statistics from "./Statistics";

const Dropdown = () => {
  const [state, setState] = useState("Alabama");
  const [county, setCounty] = useState("Autauga");
  const [countyStats, setCountyStats] = useState("");
  const [stateStats, setStateStats] = useState("");
  const [countryStats, setCountryStats] = useState("");

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
    fetch(`https://disease.sh/v3/covid-19/countries/usa`)
      .then((res) => res.json())
      .then((stats) => setCountryStats(stats));
  };

  useEffect(() => {
    return getData();
  }, [state, county]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Picker
          selectedValue={state}
          style={{
            height: 50,
            width: 100,
          }}
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
      </View>
      <Statistics
        countyStats={countyStats}
        stateStats={stateStats}
        countryStats={countryStats}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "80%",
  },
  wrapper: {
    height: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
});

export default Dropdown;
