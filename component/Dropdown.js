import React, { useState, useEffect } from "react";
import { View, Text, Picker, TouchableOpacity, StyleSheet } from "react-native";

import Data from "../constant/Data";
import Statistics from "./Statistics";

import Color from "../constant/Color";

const Dropdown = () => {
  const [state, setState] = useState("Alabama");
  const [county, setCounty] = useState("Autauga");
  const [countyStats, setCountyStats] = useState("");
  const [stateStats, setStateStats] = useState("");
  const [countryStats, setCountryStats] = useState("");
  const [highlightState, setHighlightState] = useState(true);
  const [highlightCounty, setHighlightCounty] = useState(false);
  const [showStats, setShowStats] = useState("state");

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
      <View style={styles.stateAndCountyDropdownWrapper}>
        <Picker
          selectedValue={state}
          style={{
            backgroundColor: highlightState ? Color.white : Color.blue,
            height: "100%",
            width: "50%",
            // paddingTop: "3%",
            borderColor: Color.blue,
            borderWidth: "4%",
            borderRadius: "50%",
          }}
          onValueChange={(itemValue, itemIndex) => {
            setHighlightCounty(false);
            setHighlightState(true);
            setCounty(Data[itemValue][0]);
            setState(itemValue);
          }}
          itemStyle={{
            height: 51,
            fontSize: 30,
          }}
        >
          {Object.keys(Data).map((state) => {
            return (
              <Picker.Item
                label={state}
                value={state}
                key={state}
                color={highlightState ? Color.blue : Color.white}
              />
            );
          })}
        </Picker>
        <Picker
          selectedValue={county}
          style={{
            display: "flex",
            alignContent: "center",
            backgroundColor: highlightCounty ? Color.white : Color.blue,
            height: "100%",
            width: "50%",
            // paddingTop: "2%",
            borderColor: Color.blue,
            borderWidth: "4%",
            borderRadius: "50%",
          }}
          itemStyle={{
            height: 51,
            fontSize: 30,
          }}
          onValueChange={(itemValue, itemIndex) => {
            setHighlightCounty(true);
            setHighlightState(false);
            setCounty(itemValue);
          }}
        >
          {Data[state].map((county) => {
            return (
              <Picker.Item
                label={county}
                value={county}
                key={county}
                color={!highlightCounty ? Color.white : Color.blue}
              />
            );
          })}
        </Picker>
      </View>
      <View style={styles.statsWrapper}>
        <View style={styles.statsWrapperText}>
          <TouchableOpacity onPress={() => setShowStats("state")}>
            <Text
              style={{
                ...styles.statsText,
                color: showStats == "state" ? Color.white : Color.offBlack,
              }}
            >
              {state}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowStats("county")}>
            <Text
              style={{
                ...styles.statsText,
                color: showStats == "county" ? Color.white : Color.offBlack,
              }}
            >
              {county}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowStats("country")}>
            <Text
              style={{
                ...styles.statsText,
                color: showStats == "country" ? Color.white : Color.offBlack,
              }}
            >
              USA
            </Text>
          </TouchableOpacity>
        </View>
        {showStats == "state" ? (
          <Statistics stats={stateStats} />
        ) : showStats == "county" ? (
          <Statistics stats={countyStats} />
        ) : (
          <Statistics stats={countryStats} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "63%",
    paddingTop: "20%",
    backgroundColor: Color.lightGrey,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  stateAndCountyDropdownWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "15%",
    marginHorizontal: "5%",
    marginBottom: "10%",
    backgroundColor: Color.blue,
    borderRadius: 100,
  },
  statsWrapper: {
    height: "70%",
  },
  statsWrapperText: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
    marginBottom: "5%",
    marginHorizontal: "10%",
  },
  statsText: {
    fontSize: 18,
    color: Color.offBlack,
    fontWeight: "bold",
  },
  countryWrapper: {
    // marginTop: 10,
    height: "100%",
    paddingHorizontal: 10,
    backgroundColor: Color.white,
    paddingTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
