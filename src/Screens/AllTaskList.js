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
import {useSelector, useDispatch} from 'react-redux';
import {addArchive, completeTask, deleteTask} from '../Redux/TaskSlice';

export default function AllTaskList() {
  const allTasks = useSelector(state => state.allTasks);
  // console.log(allTasks);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [task, setTask] = useState(false);
  const [priorTasks, setPriorTasks] = useState([]);
  const [allTask, setAllTask] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  const [selectedToDate, setSelectedToDate] = useState(new Date());
  const [filteredTasks, setFilteredTasks] = useState();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (Array.isArray(allTasks) && allTasks.length > 0) {
      setTask(true); // Set task to true
    } else {
      setTask(false); // Set task to false
    }
    const filteredPriorTasks = allTasks.filter(item => item.priority === true);
    setPriorTasks(filteredPriorTasks);
    const filteredAllTask = allTasks.filter(item => item.archive === false);
    setAllTask(filteredAllTask);
    // setTodayTasks(filteredTodayTasks);
  }, [allTasks]);
  const formatDate = date => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day.toString().padStart(1, '0')}-${month
      .toString()
      .padStart(1, '0')}-${year}`;
  };
  const handleFilterByDateRange = (fromDate, toDate) => {
    const formattedFromDate = new Date(fromDate);
    const formattedToDate = new Date(toDate); // Convert to milliseconds
    console.log(formattedFromDate, formattedToDate);
    const filteredTasks = allTasks.filter(task => {
      const taskDate = new Date(task.date).getTime(); // Convert task date to milliseconds
      return taskDate >= formattedFromDate && taskDate <= formattedToDate;
    });

    setFilteredTasks(filteredTasks);
  };
  // console.log(filteredTasks);

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
      <View style={styles.statusBtnCon}>
        <View>
          <Text style={styles.tasktitle}>{item.title}</Text>
          <Text style={styles.priorTaskDateTime}>{item.date}</Text>
        </View>

        <Text style={[styles.taskStatusBtn, {}]}>prior</Text>
      </View>
      <View style={{flexDirection: 'row'}}></View>

      <Text style={styles.taskdescription}>{item.description}</Text>
    </View>
  );
  const handelComplete = id => {
    dispatch(completeTask(id));
  };

  const handelDelete = id => {
    dispatch(deleteTask(id));
  };

  const handelArchive = id => {
    dispatch(addArchive(id));
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
        <View>
          <Text style={styles.bottomtasktitle}>{item.item.title}</Text>
          <Text style={styles.bottomtaskDateTime}>{item.item.date}</Text>
        </View>

        {item.item.priority === true ? (
          <Text style={[styles.prioritybtn, {backgroundColor: 'tomato'}]}>
            priority
          </Text>
        ) : item.item.completed ? (
          <Text style={[styles.prioritybtn, {backgroundColor: 'green'}]}>
            completed
          </Text>
        ) : null}
      </View>
      <Text style={styles.bottomtaskdescription}>{item.item.description}</Text>
    </TouchableOpacity>
  );

  const renderHiddenItem = item => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.actionButton, styles.completeBtn]}
        onPress={() => handelComplete(item.item.id)}>
        <Text style={styles.underBtnText}>Completed</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.closeBtn]}
        onPress={() => handelArchive(item.item.id)}>
        <Text style={styles.underBtnText}>Add Archieve</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteBtn]}
        onPress={() => handelDelete(item.item.id)}>
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
          {priorTasks.length === 0 ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#cbdfbd',
              }}>
              <Text>No tasks added yet. Add a task now!</Text>
            </View>
          ) : (
            <>
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
            </>
          )}
        </View>
      </View>
      <View style={styles.allTaskCon}>
        <View style={styles.allTaskCon}>
          <View>
            <Text style={styles.heading}>All Task:</Text>
            <FloatingButton onPress={() => setIsVisible(true)} />
          </View>
          {allTask.length === 0 ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#cbdfbd',
              }}>
              <Text>No tasks added yet. Add a task now!</Text>
            </View>
          ) : (
            <SwipeListView
              data={filteredTasks ? filteredTasks : allTask}
              renderItem={renderShowItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={75}
              rightOpenValue={-150}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}

              // onRowDidOpen={onItemOpen}
            />
          )}
          <Text style={{}}></Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe7fd',
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
    width: 150,
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
  priorTaskDateTime: {
    fontWeight: '500',
    color: 'gray',
    fontSize: 8,
    // top: -30,
    // left: -20,
  },
  prioritybtn: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
    borderWidth: 1,
    borderRadius: 3,
    padding: 3,
    marginLeft: 5,
    marginTop: 5,
    color: 'white',
    height: 25,
    marginRight: 10,
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
    marginBottom: 10,
    left: 5,
  },
  bottomtaskDateTime: {
    fontWeight: '500',
    color: 'gray',
    fontSize: 10,
    // marginRight: 5,
    alignSelf: 'flex-start',
    // top: -25,
    left: 5,
    // marginTop: 8,
  },
  tasktitle: {
    width: 100,
    fontWeight: '500',
    color: 'black',
    fontSize: 12,
    // alignSelf: 'center',
    // top: 6.5,
    // left: 3,
  },
  bottomtasktitle: {
    fontWeight: '500',
    color: 'black',
    fontSize: 20,
    left: 7,
    top: 5,
    // left: -80,
  },
  taskStatusBtn: {
    fontSize: 10,
    height: 15,
    // width: 30,
    fontWeight: '500',
    color: 'black',
    borderWidth: 1,
    borderRadius: 3,
    padding: 1,
    // marginRight: 10,
    marginLeft: 10,
    backgroundColor: 'tomato',
  },
  taskdescription: {
    fontWeight: '500',
    color: 'black',
    fontSize: 8,
    // top: -30,
    // left: -80,
  },
  statusBtnCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
