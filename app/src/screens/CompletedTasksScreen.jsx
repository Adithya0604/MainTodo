import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import TaskItem from "../components/TaskItem";
import SearchBar from "../components/SearchBar";

const CompletedTasksScreen = () => {
  const { tasks, searchQuery, sortBy } = useSelector((state) => state.tasks);

  const filteredTasks = tasks
    .filter((task) => task.completed)
    .filter((task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });

  return (
    <View style={styles.container}>
      <SearchBar />
      <FlatList
        data={filteredTasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onEdit={() => {}}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

export default CompletedTasksScreen;
