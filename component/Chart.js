import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import numeral from "numeral";

import Color from "../constant/Color";

const Chart = ({ nameOfLand = "Alabama", typeOfLand = "state" }) => {
  const [stateName, setStateName] = useState("");
  const [dataInfo, setDataInfo] = useState(null);
  const [dataLabels, setDataLabels] = useState([]);
  const [dataDatasets, setDataDatasets] = useState([]);

  const formatData = (data) => {
    if (nameOfLand == "USA") {
      let object = data.timeline.cases;
      let labels = [];
      let values = [];
      for (const property in object) {
        labels.push(property.slice(0, -3));
        values.push(object[property]);
      }
      setDataLabels(labels);
      setDataDatasets(values);
    } else {
      let labels = [];
      let values = [];
      for (let i = 0; i < data.length; i++) {
        if (stateName !== data[i].state && typeOfLand == "county") {
          continue;
        }
        labels.push(data[i].date.substring(5).replace("-", "/"));
        values.push(data[i].cases);
      }
      setDataLabels(labels);
      setDataDatasets(values);
    }
  };

  const getData = () => {
    if (typeOfLand == "country") {
      fetch(
        `https://disease.sh/v3/covid-19/historical/${nameOfLand}?lastdays=7`
      )
        .then((res) => res.json())
        .then((info) => formatData(info));
    } else if (typeOfLand == "county") {
      fetch(
        `https://disease.sh/v3/covid-19/nyt/counties/${nameOfLand}?lastdays=7`
      )
        .then((res) => res.json())
        .then((info) => formatData(info));
    } else {
      fetch(
        `https://disease.sh/v3/covid-19/nyt/states/${nameOfLand}?lastdays=7`
      )
        .then((res) => res.json())
        .then((info) => formatData(info));
    }
  };

  useEffect(() => {
    if (typeOfLand == "state") {
      setStateName(nameOfLand);
    }

    return getData();
  }, [nameOfLand, typeOfLand]);

  const data = {
    labels: dataLabels,
    datasets: [
      {
        data: dataDatasets,
        color: (opacity = 1) => `${Color.lightGrey}`,
        strokeWidth: 1,
      },
    ],
  };

  return (
    <View>
      <Text style={styles.legend}>Daily Cases</Text>
      {dataDatasets.length ? (
        <LineChart
          data={data}
          width={350}
          height={220}
          chartConfig={{
            decimalPlaces: 0,
            backgroundGradientFrom: Color.white,
            backgroundGradientTo: Color.white,
            color: (opacity = 1) => `${Color.offBlack}`,
            labelColor: (opacity = 1) => `${Color.offBlack}`,
            propsForDots: {
              r: "6",
              fill: Color.blue,
            },
          }}
          bezier
          verticalLabelRotation={30}
          withInnerLines={false}
          withOuterLines={false}
          formatYLabel={(value) => numeral(value).format("0.0a")}
        />
      ) : (
        <ActivityIndicator size={"large"} color={Color.orange} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  legend: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color: Color.blue,
  },
});

export default Chart;
