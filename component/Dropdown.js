import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import Statistics from "./Statistics";
import SearchResults from "./SearchResults";
import NoResults from "./NoResults";

import Data from "../constant/Data";
import Color from "../constant/Color";

const Dropdown = (props) => {
  const [state, setState] = useState("Alabama");
  const [county, setCounty] = useState("Autauga");
  const [countyStats, setCountyStats] = useState("");
  const [stateStats, setStateStats] = useState("");
  const [countryStats, setCountryStats] = useState("");
  const [highlightState, setHighlightState] = useState(true);
  const [highlightCounty, setHighlightCounty] = useState(false);
  const [showStats, setShowStats] = useState("state");
  const [userWantsToType, setUserWantsToType] = useState(false);
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    props.parentCallback(state, "state");
  }, []);

  let searchableData = [];

  let states = Object.keys(Data);

  for (let i = 0; i < states.length; i++) {
    for (let j = 0; j < Data[states[i]].length; j++) {
      let stateAndCountyObjPair = {};
      stateAndCountyObjPair[states[i]] = Data[states[i]][j];
      searchableData.push(stateAndCountyObjPair);
    }
  }

  let searchResultsData = searchableData.filter((data) => {
    let state = Object.keys(data)[0];
    let county = Object.values(data)[0];
    return (
      state.toLowerCase().includes(search.toLowerCase()) ||
      county.toLowerCase().includes(search.toLowerCase())
    );
  });

  const getStateAndCountyFromSearchFunction = (info) => {
    let { state, county } = info;
    setState(state);
    setCounty(county);
    setUserWantsToType(false);
    setSearch("");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        delayLongPress={300}
        onLongPress={() => setUserWantsToType(!userWantsToType)}
        style={{ marginBottom: "-25%" }}
      >
        <View style={styles.stateAndCountyDropdownWrapper}>
          {userWantsToType ? (
            <TextInput
              autoFocus={userWantsToType}
              placeholder="...type location"
              placeholderTextColor={Color.white}
              style={styles.search}
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
          ) : (
            <>
              <Picker
                selectedValue={state}
                style={{
                  ...styles.picker,
                  backgroundColor: highlightState ? Color.white : Color.blue,
                }}
                onValueChange={(itemValue, itemIndex) => {
                  setShowStats("state");
                  setHighlightCounty(false);
                  setHighlightState(true);
                  setCounty(Data[itemValue][0]);
                  setState(itemValue);
                  props.parentCallback(itemValue, "state");
                }}
                itemStyle={styles.pickerItem}
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
                  ...styles.picker,
                  backgroundColor: highlightCounty ? Color.white : Color.blue,
                }}
                itemStyle={styles.pickerItem}
                onValueChange={(itemValue, itemIndex) => {
                  setShowStats("county");
                  setHighlightCounty(true);
                  setHighlightState(false);
                  setCounty(itemValue);
                  props.parentCallback(itemValue, "county");
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
            </>
          )}
        </View>
      </TouchableOpacity>
      {searchResultsData.length !== 0 && userWantsToType ? (
        <SearchResults
          data={searchResultsData}
          getStateAndCountyFromSearch={getStateAndCountyFromSearchFunction}
        />
      ) : searchResultsData == 0 ? (
        <NoResults />
      ) : (
        <View style={styles.statsWrapper}>
          <View style={styles.statsWrapperText}>
            <TouchableOpacity
              onPress={() => {
                setHighlightCounty(false);
                setHighlightState(true);
                setShowStats("state");
                props.parentCallback(state, "state");
              }}
            >
              <Text
                style={{
                  ...styles.statsText,
                  color: showStats == "state" ? Color.white : Color.offBlack,
                }}
              >
                {state}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setHighlightCounty(true);
                setHighlightState(false);
                setShowStats("county");
                props.parentCallback(county, "county");
              }}
            >
              <Text
                style={{
                  ...styles.statsText,
                  color: showStats == "county" ? Color.white : Color.offBlack,
                }}
              >
                {county}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowStats("country");
                props.parentCallback("USA", "country");
              }}
            >
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
      )}
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
    height: "30%",
    marginHorizontal: "5%",
    marginBottom: "10%",
    backgroundColor: Color.blue,
    borderRadius: 100,
  },
  search: {
    color: Color.white,
    fontWeight: "bold",
    fontSize: 30,
    width: "70%",
    height: "100%",
    textAlign: "center",
    // backgroundColor: Color.lightGrey,
    // borderRadius: 100,
  },
  picker: {
    height: "100%",
    width: "50%",
    borderColor: Color.blue,
    borderWidth: 4,
    borderRadius: 100,
  },
  pickerItem: {
    height: 51,
    fontSize: 30,
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
    fontSize: 16,
    color: Color.offBlack,
    fontWeight: "bold",
    paddingHorizontal: 20,
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
