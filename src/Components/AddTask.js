import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Button from '../Components/Button';
import uuid from 'react-native-uuid';
import {useDispatch} from 'react-redux';
import {addTask, editTask} from '../Redux/TaskSlice';

export default function AddTask({isVisible, setIsVisible, editingTask}) {
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [priority, setPriority] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  useEffect(() => {
    if (editingTask) {
      setFormattedDate(editingTask.date);
      setTaskTitle(editingTask.title);
      setTaskDescription(editingTask.description);
      setPriority(editingTask.priority);
    }
  }, [editingTask]);

  const handleConfirmDate = date => {
    hideDatePicker();
    const newFormattedDate = formatSelectedDate(date);
    const newFormattedTime = formatSelectedTime(date);
    setFormattedDate(newFormattedDate);
    setFormattedTime(newFormattedTime);
    setSelectedDate(date);
  };

  const formatSelectedDate = date => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatSelectedTime = date => {
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };
  const [formattedDate, setFormattedDate] = useState(
    formatSelectedDate(new Date()),
  );
  const [formattedTime, setFormattedTime] = useState(
    formatSelectedTime(new Date()),
  );

  // console.log(formattedDate, formattedTime);
  const handleAddTask = () => {
    const task = {
      id: editingTask ? editingTask.id : uuid.v4(),
      date: formattedDate,
      time: formattedTime,
      title: taskTitle,
      description: taskDescription,
      priority: priority,
      archive: false,
      completed: false,
    };

    if (taskTitle && taskDescription) {
      if (editingTask) {
        dispatch(editTask(task));
      } else {
        dispatch(addTask(task));
      }
      setTaskTitle('');
      setTaskDescription('');
      setPriority(false);
      setSelectedDate(new Date());
      setFormattedDate(formatSelectedDate(new Date()));
      setFormattedTime(formatSelectedTime(new Date()));
      setIsVisible(false);
    } else {
      alert('Empty task cannot be added');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setIsVisible(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setTaskTitle('');
              setTaskDescription('');
              setPriority(false);
              setSelectedDate(new Date());
              setFormattedDate(formatSelectedDate(new Date()));
              setFormattedTime(formatSelectedTime(new Date()));
              setIsVisible(false);
            }}>
            <Icon name="close" size={24} color="gray" />
          </TouchableOpacity>
          <View style={styles.dateTimePickerBox}>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />
          </View>
          <Text style={styles.title}>Add New Task</Text>
          <View style={styles.datePickerContainer}>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={showDatePicker}>
              <Icon name="event" size={24} color="gray" />
              <Text style={styles.datePickerText}>
                {formattedDate}, {formattedTime}
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Task Title"
            placeholderTextColor="gray"
            value={taskTitle}
            onChangeText={text => setTaskTitle(text)}
          />
          <View style={styles.descriptionInputVIew}>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Task Description"
              placeholderTextColor="gray"
              multiline
              value={taskDescription}
              onChangeText={text => setTaskDescription(text)}
            />
          </View>

          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Status: </Text>
            <View style={styles.statusButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  priority === true && styles.activeStatusButton,
                ]}
                onPress={() => setPriority(!priority)}>
                <Text style={styles.statusButtonText}>Prior</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            ButtonName={editingTask ? 'Update' : 'Add-Task'}
            onPress={handleAddTask}
            btnStyles={styles.addTaskButton}
            btnTextStyles={styles.addTaskButtonText}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    top: -15,
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  descriptionInput: {
    borderColor: 'gray',
    left: 5,
  },
  descriptionInputVIew: {
    height: 120,
    borderWidth: 1,
    borderColor: 'gray',
    // padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  datePickerButton: {
    flexDirection: 'row',
  },
  datePickerText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'gray',
    left: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: 450,
    width: '85%',
    margin: 20,
    backgroundColor: '#edede9',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  dateTimePickerBox: {
    marginBottom: 20,
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  statusButtonContainer: {
    flexDirection: 'row',
  },
  statusText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
  },
  statusButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  activeStatusButton: {
    backgroundColor: '#2196F3',
  },
  statusButtonText: {
    color: 'black',
  },
  addTaskButton: {
    height: 40,
    width: 130,
    backgroundColor: '#80b918',
    alignSelf: 'center',
  },
  addTaskButtonText: {
    color: 'white',
  },
});
