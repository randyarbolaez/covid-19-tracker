import React, { useState, useEffect } from "react";
import { View, Text, Picker, StyleSheet } from "react-native";

import Data from "../constant/Data";
import Statistics from "./Statistics";

import Color from "../constant/Color";

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
      <View style={styles.stateWrapper}>
        <Picker
          selectedValue={state}
          style={{
            backgroundColor: Color.blue,
            height: 80,
            width: "100%",
            paddingTop: "3%",
            borderTopRightRadius: "50%",
            borderBottomRightRadius: "50%",
          }}
          onValueChange={(itemValue, itemIndex) => {
            setCounty(Data[itemValue][0]);
            setState(itemValue);
          }}
          itemStyle={{
            height: 63,
            fontSize: 42,
          }}
        >
          {Object.keys(Data).map((state) => {
            return (
              <Picker.Item
                label={state}
                value={state}
                key={state}
                color={Color.background}
              />
            );
          })}
        </Picker>
      </View>
      <Statistics stats={stateStats} />
      <View style={styles.countyWrapper}>
        <Picker
          selectedValue={county}
          style={{
            backgroundColor: Color.blue,
            height: 60,
            width: "100%",
            paddingBottom: "20%",
            borderColor: Color.blue,
            borderWidth: "4%",
            borderRadius: "50%",
          }}
          itemStyle={{
            height: 50,
            fontSize: 30,
          }}
          onValueChange={(itemValue, itemIndex) => setCounty(itemValue)}
        >
          {Data[state].map((county) => {
            return (
              <Picker.Item
                label={county}
                value={county}
                key={county}
                color={Color.background}
              />
            );
          })}
        </Picker>
      </View>
      <Statistics stats={countyStats} />
      <Text></Text>
      <Text>Country</Text>
      <Statistics stats={countryStats} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "80%",
  },
  stateWrapper: {
    width: "90%",
    marginRight: "10%",
    height: "20%",
  },
  countyWrapper: {
    width: "80%",
    height: "17%",
    marginHorizontal: "10%",
    marginTop: 30,
  },
});

export default Dropdown;

// <Text></Text>
// <Text>State</Text>
// <Statistics stats={stateStats} />
// <Text></Text>
// <Text>County</Text>
// <Statistics stats={countyStats} />
// <Text></Text>
// <Text>Country</Text>
// <Statistics stats={countryStats} />
