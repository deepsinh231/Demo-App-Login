import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import Notifications from "./screen/tabScreens/Notifications";
import Feed from "./screen/tabScreens/Feed";
import Settings from "./screen/tabScreens/Settings";
import Payment from "./screen/DraweStack/Payment";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import TweetDetailsScreen from "./screen/homeStack/TweetDetailsScreen";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, useColorScheme } from "react-native";

// Stack
const HomeStack = createNativeStackNavigator();
function HomeStackGroup() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="TabGroup"
        component={TabGroup}
      />
      <HomeStack.Screen
        name="TweetDetailsScreen"
        component={TweetDetailsScreen}
        options={{
          presentation: "fullScreenModal",
          headerTitle: "Tweet Details",
          headerShown: true,
        }}
      />
    </HomeStack.Navigator>
  );
}

// Tab Bottom
const Tab = createBottomTabNavigator();
function TabGroup({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          if (route.name === "deepsinh231") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Notifications") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="deepsinh231"
        component={TopTabGroup}
        // options={{  }}
        options={{
          tabBarLabel: "deepsinh231",
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <Image
                source={require("../../assets/images/beto.jpeg")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  marginLeft: 15,
                }}
              />
            </Pressable>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen name="Notifications" component={Notifications}></Tab.Screen>
      <Tab.Screen name="Settings" component={Settings}></Tab.Screen>
    </Tab.Navigator>
  );
}

// Drawer
const Drawer = createDrawerNavigator();
function DrawerScreen() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={HomeStackGroup}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="Payment" component={Payment} />
      <Drawer.Screen name="Payment2" component={Payment} />
    </Drawer.Navigator>
  );
}

// TopTab
const TopTab = createMaterialTopTabNavigator();
function TopTabGroup() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "green",
          height: 3,
        },
        tabBarStyle: {
          // backgroundColor: "#fff",
          shadowColor: "transparent",
          elevation: 0,
          borderTopColor: "#ddd",
          borderTopWidth: 1,
        },
      }}
    >
      <TopTab.Screen
        name="main"
        component={Feed}
        options={{ headerShown: false }}
      />
      <TopTab.Screen name="Following" component={Notifications} />
      <TopTab.Screen name="👀" component={Settings} />
    </TopTab.Navigator>
  );
}

export default function Navigation() {
  const theme = useColorScheme();
  return (
    <NavigationContainer
      theme={theme === "dark" ? DarkTheme : DefaultTheme}
      independent={true}
    >
      <StatusBar style="auto" />
      <DrawerScreen />
    </NavigationContainer>
  );
}
