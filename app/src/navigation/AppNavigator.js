import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TodoListScreen from "../screens/TodoListScreen";
import CompletedTasksScreen from "../screens/CompletedTasksScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { paddingBottom: 5 },
        tabBarActiveTintColor: "#6200ee",
      }}
    >
      <Tab.Screen
        name="Tasks"
        component={TodoListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="format-list-checks"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedTasksScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="check-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
