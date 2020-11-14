import * as React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "react-native-vector-icons";

import HomeScreen from "../screen/HomeScreen";
import InformationScreen from "../screen/InformationScreen";
import StatisticsScreen from "../screen/StatisticsScreen";
import Color from "../constant/Color";

const Tab = createBottomTabNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home-variant" : "home-variant-outline";
          } else if (route.name === "Statistics") {
            iconName = "ios-stats";
          } else if (route.name === "Information") {
            iconName = focused
              ? "ios-information-circle-outline"
              : "ios-information-circle";
          }

          // You can return any component that you like here!
          return (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: `${focused ? "#007aff" : Color.background}`,
                width: "50%",
                height: "85%",
                borderRadius: 100,
              }}
            >
              {route.name == "Home" ? (
                <MaterialCommunityIcons
                  name={iconName}
                  size={30}
                  color={focused ? Color.background : color}
                />
              ) : (
                <Ionicons
                  name={iconName}
                  size={30}
                  color={focused ? Color.background : color}
                />
              )}
            </View>
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOffset: { width: 0, height: 0 },
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarBadgeStyle: {
            width: "10px",
            backgroundColor: "red",
            height: "20px",
          },
        }}
      />
      <Tab.Screen name="Statistics" component={StatisticsScreen} />
      <Tab.Screen name="Information" component={InformationScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default Navigation;
