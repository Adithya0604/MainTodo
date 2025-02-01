import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { FAB, Menu } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import TaskItem from "../components/TaskItem";
import AddTaskModal from "../components/AddTaskModal";
import SearchBar from "../components/SearchBar";
import { setSortBy, setTasks, addTask, updateTask } from "../redux/taskSlice";
import { saveTasks, loadTasks } from "../utils/storage";

const TodoListScreen = () => {
  const dispatch = useDispatch();
  const { tasks, searchQuery, sortBy } = useSelector((state) => state.tasks);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);

  useEffect(() => {
    loadTasks().then((savedTasks) => {
      if (savedTasks.length) {
        dispatch(setTasks(savedTasks));
      }
    });
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const filteredTasks = tasks
    .filter((task) => !task.completed)
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
      <Menu
        visible={sortMenuVisible}
        onDismiss={() => setSortMenuVisible(false)}
        anchor={
          <FAB
            icon="sort"
            style={styles.sortButton}
            small
            onPress={() => setSortMenuVisible(true)}
          />
        }
      >
        <Menu.Item
          onPress={() => {
            dispatch(setSortBy("name"));
            setSortMenuVisible(false);
          }}
          title="Sort by Name"
        />
        <Menu.Item
          onPress={() => {
            dispatch(setSortBy("dueDate"));
            setSortMenuVisible(false);
          }}
          title="Sort by Due Date"
        />
      </Menu>
      <FlatList
        data={filteredTasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onEdit={(task) => {
              setEditingTask(task);
              setModalVisible(true);
            }}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          setEditingTask(null);
          setModalVisible(true);
        }}
      />
      <AddTaskModal
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
          setEditingTask(null);
        }}
        onSubmit={(task) => {
          if (editingTask) {
            dispatch(updateTask({ ...task, completed: editingTask.completed }));
          } else {
            dispatch(addTask(task));
          }
          setModalVisible(false);
          setEditingTask(null);
        }}
        initialTask={editingTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  sortButton: {
    position: "absolute",
    margin: 16,
    right: 0,
    top: 0,
  },
});

export default TodoListScreen;
