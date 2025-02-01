import React, { useState } from "react";
import { Modal, Portal, TextInput, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddTaskModal = ({ visible, onDismiss, onSubmit, initialTask = null }) => {
  const [taskName, setTaskName] = useState(initialTask?.name || "");
  const [dueDate, setDueDate] = useState(
    initialTask?.dueDate ? new Date(initialTask.dueDate) : null
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    if (taskName.trim()) {
      onSubmit({
        ...(initialTask && { id: initialTask.id }),
        name: taskName.trim(),
        dueDate: dueDate?.toISOString(),
      });
      setTaskName("");
      setDueDate(null);
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <TextInput
          label="Task Name"
          value={taskName}
          onChangeText={setTaskName}
          style={styles.input}
        />
        <Button
          onPress={() => setShowDatePicker(true)}
          mode="outlined"
          style={styles.dateButton}
        >
          {dueDate ? dueDate.toLocaleDateString() : "Set Due Date"}
        </Button>
        {showDatePicker && (
          <DateTimePicker
            value={dueDate || new Date()}
            mode="date"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDueDate(selectedDate);
              }
            }}
          />
        )}
        <View style={styles.buttonContainer}>
          <Button onPress={onDismiss} style={styles.button}>
            Cancel
          </Button>
          <Button onPress={handleSubmit} mode="contained" style={styles.button}>
            {initialTask ? "Update" : "Add"} Task
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  input: {
    marginBottom: 16,
  },
  dateButton: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    marginLeft: 8,
  },
});

export default AddTaskModal;
