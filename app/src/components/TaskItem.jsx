import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Checkbox, Text, IconButton, Menu } from "react-native-paper";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../redux/taskSlice";

const TaskItem = ({ task, onEdit }) => {
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.taskRow}>
          <Checkbox
            status={task.completed ? "checked" : "unchecked"}
            onPress={() =>
              dispatch(updateTask({ id: task.id, completed: !task.completed }))
            }
          />
          <View style={styles.taskInfo}>
            <Text
              style={[styles.taskName, task.completed && styles.completedTask]}
            >
              {task.name}
            </Text>
            {task.dueDate && (
              <Text style={styles.dueDate}>
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </Text>
            )}
          </View>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <IconButton
                icon="dots-vertical"
                onPress={() => setMenuVisible(true)}
              />
            }
          >
            <Menu.Item
              onPress={() => {
                setMenuVisible(false);
                onEdit(task);
              }}
              title="Edit"
            />
            <Menu.Item
              onPress={() => {
                setMenuVisible(false);
                dispatch(deleteTask(task.id));
              }}
              title="Delete"
            />
          </Menu>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
    marginHorizontal: 8,
  },
  cardContent: {
    paddingVertical: 8,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskInfo: {
    flex: 1,
    marginLeft: 8,
  },
  taskName: {
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#666",
  },
  dueDate: {
    fontSize: 12,
    color: "#666",
  },
});

export default TaskItem;
