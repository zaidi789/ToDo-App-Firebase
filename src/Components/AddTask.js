import React, {useState} from 'react';
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

export default function AddTask({isVisible, setIsVisible}) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  //   const [isVisible, setIsVisible] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirmDate = date => {
    hideDatePicker();
    setSelectedDate(date);
  };
  const formatDate = date => {
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} ${formatTime(date)} ${getAmPm(date)}`;
    return formattedDate;
  };
  const formatTime = date => {
    let hours = date.getHours() % 12;
    hours = hours === 0 ? 12 : hours;
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };
  const getAmPm = date => {
    return date.getHours() >= 12 ? 'PM' : 'AM';
  };
  const handleAddTask = () => {
    console.log('Task added:', selectedDate, taskTitle, taskDescription);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setIsVisible(!isVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsVisible(!isVisible)}>
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
          <View
            style={{
              borderWidth: 1,
              marginBottom: 10,
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.datePickerContainer}
              onPress={showDatePicker}>
              <Icon name="event" size={24} color="gray" />
              <Text style={styles.datePickerText}>
                {formatDate(selectedDate)}
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
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Task Description"
            placeholderTextColor="gray"
            multiline
            value={taskDescription}
            onChangeText={text => setTaskDescription(text)}
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />
          <View>
            <Button ButtonName={'Add-Task'} />
          </View>
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
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  descriptionInput: {
    height: 120,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  datePickerText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'gray',
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
    backgroundColor: 'white',
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
});
