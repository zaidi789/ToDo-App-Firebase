import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import {SwipeListView} from 'react-native-swipe-list-view';
import FloatingButton from '../Components/FlatingButton';
import AddTask from '../Components/AddTask';

export default function AllTaskList() {
  const navigation = useNavigation();
  const [priorTasks, setPriorTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  const [selectedToDate, setSelectedToDate] = useState(new Date());
  const [filteredTasks, setFilteredTasks] = useState();
  const [tasks, setTasks] = useState([
    {
      title: 'Gym',
      description: 'Go to Gym',
      dateTime: '2023-08-17 10:00 AM',
      id: 1,
      status: 'New',
    },
    {
      title: 'Office',
      description: 'Go to Office',
      dateTime: '2023-08-17 02:30 PM',
      id: 2,
      status: 'Completed',
    },
    {
      title: 'Work',
      description: 'Go to Office',
      dateTime: '2023-08-18 09:00 AM',
      id: 20,
      status: 'New',
    },
    {
      title: 'Bike',
      description: 'Go to Office',
      dateTime: '2023-08-18 03:00 PM',
      id: 3,
      status: 'Prior',
    },
    {
      title: 'Travel',
      description: 'Task 5',
      dateTime: '2023-08-19 11:30 AM',
      id: 4,
      status: 'New',
    },
    {
      title: 'Gym',
      description: 'Task 6',
      dateTime: '2023-08-20 09:00 AM',
      id: 5,
      status: 'Completed',
    },
    {
      title: 'Gym',
      description: 'Task 7',
      dateTime: '2023-08-20 02:30 PM',
      id: 6,
      status: 'New',
    },
    {
      title: 'Gym',
      description: 'Task 8',
      dateTime: '2023-08-21 09:00 AM',
      id: 7,
      status: 'Prior',
    },
    {
      title: 'Gym',
      description: 'Task 9',
      dateTime: '2023-08-21 03:00 PM',
      id: 8,
      status: 'New',
    },
    {
      title: 'Gym',
      description: 'Task 10',
      dateTime: '2023-08-22 11:30 AM',
      id: 9,
      status: 'Prior',
    },
    {
      title: 'Gym',
      description: 'Task 11',
      dateTime: '2023-08-23 09:00 AM',
      id: 10,
      status: 'New',
    },
    {
      title: 'Gym',
      description: 'Task 12',
      dateTime: '2023-08-23 02:30 PM',
      id: 11,
      status: 'New',
    },
    {
      title: 'Gym',
      description: 'Task 13',
      dateTime: '2023-08-24 09:00 AM',
      id: 12,
      status: 'New',
    },
    {
      title: 'Gym',
      description: 'Task 14',
      dateTime: '2023-08-24 03:00 PM',
      id: 13,
      status: 'Completed',
    },
    {
      title: 'Gym',
      description: 'Task 15',
      dateTime: '2023-08-25 11:30 AM',
      id: 14,
      status: 'New',
    },
    {
      title: 'Gym',
      description: 'Task 16',
      dateTime: '2023-08-26 09:00 AM',
      id: 15,
      status: 'Prior',
    },
    {
      title: 'Gym',
      description: 'Task 17',
      dateTime: '2023-08-26 02:30 PM',
      id: 16,
      status: 'New',
    },
    {
      title: 'Gym',
      description: 'Task 18',
      dateTime: '2023-08-27 09:00 AM',
      id: 17,
      status: 'New',
    },
    {
      title: 'Gym',
      description: 'Task 19',
      dateTime: '2023-08-27 03:00 PM',
      id: 18,
      status: 'Completed',
    },
    {
      title: 'Gym',
      description: 'Task 20',
      dateTime: '2023-08-28 11:30 AM',
      id: 19,
      status: 'New',
    },
  ]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const filteredPriorTasks = tasks.filter(item => item.status === 'Prior');
    setPriorTasks(filteredPriorTasks);
  }, []);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleFilterByDateRange = (fromDate, toDate) => {
    const formattedFromDate = fromDate.toISOString().split('T')[0];
    const formattedToDate = toDate.toISOString().split('T')[0];
    const filteredTasks = tasks.filter(task => {
      const taskDate = task.dateTime.split(' ')[0];
      return taskDate >= formattedFromDate && taskDate <= formattedToDate;
    });
    setFilteredTasks(filteredTasks);
    console.log(filteredTasks);
  };
  const getRangeMarkedDates = (startDate, endDate) => {
    const rangeMarkedDates = {};
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      rangeMarkedDates[currentDate.toISOString().split('T')[0]] = {
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'blue',
      };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return rangeMarkedDates;
  };

  //   console.log('priority tasks', priorTasks);

  const renderItem = ({item}) => (
    <View style={styles.taskItem}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text
          style={{
            //   left: -75,
            fontSize: 8,
            fontWeight: '500',
            color: 'black',
            borderWidth: 1,
            borderRadius: 3,
            padding: 3,
            // marginBottom: 10,
            backgroundColor:
              item.status === 'Completed'
                ? 'green'
                : item.status === 'new'
                ? 'blue'
                : item.status === 'Prior'
                ? 'tomato'
                : '#FFFFFF',
          }}>
          {item.status}
        </Text>
        <Text style={styles.taskDateTime}>{item.dateTime}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            //   left: -75,
            fontSize: 8,
            fontWeight: '500',
            color: 'black',
            // marginBottom: 10,
          }}>
          Title:
        </Text>
        <Text style={styles.tasktitle}>{item.title}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            //   left: -75,
            fontSize: 8,
            fontWeight: '500',
            color: 'black',
            marginBottom: 10,
          }}>
          Description:
        </Text>
        <Text style={styles.taskdescription}>{item.description}</Text>
      </View>
    </View>
  );
  const closeItem = () => {
    console.log('Close button press');
  };

  const deleteItem = () => {
    console.log('Close button press');
  };

  const onItemOpen = () => {
    console.log('This row opened');
  };

  const renderShowItem = item => (
    <TouchableOpacity
      onPress={() => console.log('You touched me')}
      style={styles.rowFront}
      underlayColor={'#fff'}
      activeOpacity={0.9}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            color: 'black',
            borderWidth: 1,
            borderRadius: 3,
            padding: 3,
            marginLeft: 5,
            marginTop: 5,
            color: 'white',
            // marginBottom: 10,
            backgroundColor:
              item.item.status === 'Completed'
                ? '#008000'
                : item.item.status === 'Prior'
                ? '#FF1E1E'
                : item.item.status === 'New'
                ? '#0077b6'
                : '',
          }}>
          {item.item.status}
        </Text>
        <Text style={styles.bottomtaskDateTime}>{item.item.dateTime}</Text>
      </View>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: 'black',
              left: 5,
            }}>
            Title:
          </Text>
          <Text style={styles.bottomtasktitle}>{item.item.title}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            color: 'black',
            left: 5,
            // marginBottom: 10,
          }}>
          Description:
        </Text>
        <Text style={styles.bottomtaskdescription}>
          {item.item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.actionButton, styles.completeBtn]}
        onPress={() => closeItem()}>
        <Text style={styles.underBtnText}>Completed</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.closeBtn]}
        onPress={() => closeItem()}>
        <Text style={styles.underBtnText}>Add Archieve</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteBtn]}
        onPress={() => deleteItem()}>
        <Text style={styles.underBtnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <AddTask setIsVisible={setIsVisible} isVisible={isVisible} />
      <View style={styles.topFilterCon}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.btnText}>Filter</Text>
          <MaterialCommunityIcons
            name="calendar-search"
            size={35}
            color="white"
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.calendarRange}>
              <View style={styles.calendarContainer}>
                <Text style={styles.calendarTitle}>Select Date Range</Text>
                <Calendar
                  onDayPress={day => {
                    const selected = new Date(day.dateString);
                    if (
                      selected >= selectedFromDate &&
                      selected <= selectedToDate
                    ) {
                      setSelectedFromDate(selected);
                      setSelectedToDate(selected);
                    } else if (selected < selectedFromDate) {
                      setSelectedFromDate(selected);
                    } else if (selected > selectedToDate) {
                      setSelectedToDate(selected);
                    }
                  }}
                  markedDates={{
                    [selectedFromDate.toISOString().split('T')[0]]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedColor: 'blue',
                    },
                    [selectedToDate.toISOString().split('T')[0]]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedColor: 'blue',
                    },
                    ...getRangeMarkedDates(selectedFromDate, selectedToDate),
                  }}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                handleFilterByDateRange(selectedFromDate, selectedToDate);
                setSelectedToDate(selectedFromDate);
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Apply Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                // Decrease the selected date range
                setSelectedToDate(selectedFromDate);
              }}>
              <Text style={styles.textStyle}>Reset Range</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.priorityLCon}>
        <View style={styles.priorityLCon}>
          <Text style={styles.heading}>Priority Task List:</Text>
          <FlatList
            data={priorTasks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            style={styles.taskList}
            horizontal
          />
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => {
              navigation.navigate('Priority-Task');
            }}>
            <Text>View all prior tasks --{'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.allTaskCon}>
        <View style={styles.allTaskCon}>
          <View>
            <Text style={styles.heading}>All Task:</Text>
            <FloatingButton onPress={() => setIsVisible(true)} />
          </View>
          <SwipeListView
            data={tasks}
            renderItem={renderShowItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-150}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onItemOpen}
          />
          <Text style={{}}></Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topFilterCon: {
    marginTop: 10,
    height: 50,
    alignItems: 'center',
    // backgroundColor: 'orange',
  },
  priorityLCon: {
    height: 150,
    // backgroundColor: 'green',
    marginTop: 10,
    padding: 5,
  },
  allTaskCon: {
    height: 438,
    padding: 5,
    // backgroundColor: 'tomato',
    marginTop: 10,
  },
  btn: {
    flexDirection: 'row',
    height: 50,
    width: '90%',
    backgroundColor: '#279EFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 30,
    left: 20,
  },
  filterIcon: {
    right: 10,
  },
  taskItem: {
    // alignItems: 'center',
    backgroundColor: '#f0f0f0',
    // backgroundColor: 'green',
    height: 80,
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    marginRight: 15,
  },
  taskDateTime: {
    fontWeight: '500',
    color: 'black',
    fontSize: 8,
    alignSelf: 'flex-start',
    // top: -25,
    left: 8,
    marginTop: 5,
  },
  allTaskItem: {
    // alignItems: 'center',
    backgroundColor: '#f0f0f0',
    // padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    height: 100,
    // marginRight: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginBottom: 5,
    left: 5,
  },
  bottomtaskDateTime: {
    fontWeight: '500',
    color: 'black',
    fontSize: 12,
    marginRight: 5,
    alignSelf: 'flex-start',
    // top: -25,
    // left: 8,
    marginTop: 8,
  },
  tasktitle: {
    fontWeight: '500',
    color: 'black',
    fontSize: 8,
    // top: -30,
    // left: -80,
  },
  bottomtasktitle: {
    fontWeight: '500',
    color: 'black',
    fontSize: 14,
    left: 7,
    // top: -30,
    // left: -80,
  },
  taskdescription: {
    fontWeight: '500',
    color: 'black',
    fontSize: 8,
    // top: -30,
    // left: -80,
  },
  bottomtaskdescription: {
    fontWeight: '500',
    color: 'black',
    fontSize: 14,
    // top: -30,
    left: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: 550,
    width: '90%',
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
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
    marginTop: 10,
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
  calendarButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  calendarButtonText: {
    color: 'white',
  },
  rowFront: {
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderWidth: 0.5,
    height: 150,
    marginBottom: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  rowBack: {
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    height: 80,
  },
  actionButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  underBtnText: {
    color: '#FFF',
  },
  closeBtn: {
    backgroundColor: '#012a4a',
    right: 75,
    borderRadius: 10,
  },
  deleteBtn: {
    backgroundColor: 'red',
    right: 0,
    borderRadius: 10,
  },
  completeBtn: {
    backgroundColor: 'green',
    right: 264,
    borderRadius: 10,

    // left: -500,
  },
});
