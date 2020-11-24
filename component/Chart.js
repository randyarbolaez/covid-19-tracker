import React from "react";
import { View, Alert } from "react-native";
import { Grid, StackedBarChart, XAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";

import Color from "../constant/Color";

const Chart = (props) => {
  // const data = [
  //   {
  //     month: new Date(2015, 0, 1),
  //     apples: 3840,
  //     bananas: 1920,
  //     cherries: 960,
  //   },
  //   {
  //     month: new Date(2015, 1, 1),
  //     apples: 1600,
  //     bananas: 1440,
  //     cherries: 960,
  //   },
  //   {
  //     month: new Date(2015, 2, 1),
  //     apples: 640,
  //     bananas: 960,
  //     cherries: 3640,
  //   },
  //   {
  //     month: new Date(2015, 3, 1),
  //     apples: 3320,
  //     bananas: 480,
  //     cherries: 640,
  //   },
  //   {
  //     month: new Date(2015, 4, 1),
  //     apples: 520,
  //     bananas: 220,
  //     cherries: 440,
  //     svg: {
  //       onPress: () => console.log("onPress => 3:tomato:400"),
  //     },
  //   },
  // ];
  // const colors = [Color.orange, Color.red, Color.teal];
  // const keys = ["apples", "bananas", "cherries"];
  // return (
  //   <View
  //     style={{
  //       height: "80%",
  //       width: "80%",
  //       flexDirection: "row",
  //     }}
  //   >
  //     <StackedBarChart
  //       style={{ flex: 1, marginHorizontal: -10 }}
  //       keys={keys}
  //       xAccessor={({ item }) => item.month}
  //       colors={colors}
  //       data={data}
  //       contentInset={{ top: 30, bottom: 30 }}
  //       onPress={() => {
  //         console.log("hello");
  //       }}
  //     >
  //       <XAxis
  //         style={{ marginHorizontal: -10 }}
  //         data={data}
  //         xAccessor={({ item }) => item.month}
  //         formatLabel={(value, index) => {
  //           console.log(value.toDateString());
  //           return value.toISOString().split("T")[0];
  //           return index;
  //         }}
  //         contentInset={{ left: 30, right: 30 }}
  //         svg={{ fontSize: 10, fill: "black" }}
  //       />
  //     </StackedBarChart>
  //   </View>
  // );

  const colors = ["#33691E", "#689F38", "#9CCC65", "#DCEDC8"];
  const data = [
    {
      broccoli: {
        value: 3840,
        svg: {
          onPress: () => {
            Alert.alert("onPress => 0:broccoli:3840");
            console.log("onPress => 0:broccoli:3840");
          },
        },
      },
      celery: {
        value: 1920,
        svg: {
          onPress: () => console.log("onPress => 0:celery:1920"),
        },
      },
      onions: {
        value: 960,
        svg: {
          onPress: () => console.log("onPress => 0:onions:960"),
        },
      },
      tomato: {
        value: 400,
        svg: {
          onPress: () => console.log("onPress => 0:tomato:400"),
        },
      },
    },
    {
      broccoli: {
        value: 1600,
        svg: {
          onPress: () => console.log("onPress => 1:broccoli:1600"),
        },
      },
      celery: {
        value: 1440,
        svg: {
          onPress: () => console.log("onPress => 1:celery:1440"),
        },
      },
      onions: {
        value: 960,
        svg: {
          onPress: () => console.log("onPress => 1:onions:960"),
        },
      },
      tomato: {
        value: 400,
        svg: {
          onPress: () => console.log("onPress => 1:tomato:400"),
        },
      },
    },
    {
      broccoli: {
        value: 640,
        svg: {
          onPress: () => console.log("onPress => 2:broccoli:640"),
        },
      },
      celery: {
        value: 960,
        svg: {
          onPress: () => console.log("onPress => 2:celery:960"),
        },
      },
      onions: {
        value: 3640,
        svg: {
          onPress: () => console.log("onPress => 2:onions:3640"),
        },
      },
      tomato: {
        value: 400,
        svg: {
          onPress: () => console.log("onPress => 2:tomato:400"),
        },
      },
    },
    {
      broccoli: {
        value: 3320,
        svg: {
          onPress: () => console.log("onPress => 3:broccoli:3320"),
        },
      },
      celery: {
        value: 480,
        svg: {
          onPress: () => console.log("onPress => 3:celery:480"),
        },
      },
      onions: {
        value: 640,
        svg: {
          onPress: () => console.log("onPress => 3:onions:640"),
        },
      },
      tomato: {
        value: 400,
        svg: {
          onPress: () => console.log("onPress => 3:tomato:400"),
        },
      },
    },
  ];
  const keys = ["broccoli", "celery", "onions", "tomato"];
  return (
    <View style={{ height: 200, width: 200 }}>
      <StackedBarChart
        style={{ flex: 1 }}
        colors={colors}
        contentInset={{ top: 30, bottom: 30 }}
        data={data}
        keys={keys}
        valueAccessor={({ item, key }) => item[key].value}
      >
        <Grid />
      </StackedBarChart>
      <XAxis
        style={{ marginHorizontal: -10 }}
        data={data}
        formatLabel={(value, index) => {
          return index;
        }}
        contentInset={{ left: 30, right: 30 }}
        svg={{ fontSize: 10, fill: "black" }}
      />
    </View>
  );
};

export default Chart;
