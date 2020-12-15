import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import SearchResultItem from "./SearchResultItem";

const SearchResults = ({ data, getStateAndCountyFromSearch }) => {
  const stateAndCountyFromBtnFunction = (btnUserCickedInfo) => {
    getStateAndCountyFromSearch(btnUserCickedInfo);
  };

  return (
    <FlatList
      columnWrapperStyle={{ justifyContent: "center" }}
      horizontal={false}
      numColumns={2}
      data={data}
      renderItem={(item) => (
        <SearchResultItem
          item={item}
          stateAndCountyFromBtn={stateAndCountyFromBtnFunction}
        />
      )}
      keyExtractor={(item) => Object.keys(item)[0] + Object.values(item)[0]}
    />
  );
};

const styles = StyleSheet.create({});

export default SearchResults;
