import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import {SwipeListView} from 'react-native-swipe-list-view';
import FloatingButton from '../Components/FlatingButton';
import AddTask from '../Components/AddTask';
import {useSelector, useDispatch} from 'react-redux';
import {addArchive, completeTask, deleteTask} from '../Redux/TaskSlice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Loader from '../Components/Loader';

export default function AllTaskList() {
  const userId = auth().currentUser.uid;
  const allTasks = useSelector(state => state.allTasks);
  // console.log(allTasks);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [task, setTask] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  const [selectedToDate, setSelectedToDate] = useState(new Date());
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSubtask, setIsSubTask] = useState();
  const [isEditing, setIsEditing] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // console.log('all task', allTask);
  const priorityTasks = useSelector(state =>
    state?.allTasks?.filter(
      task => task?.priority === true && task?.archive === false,
    ),
  );
  // console.log(priorityTasks);
  const nonArchivedTasks = useSelector(state =>
    state?.allTasks?.filter(task => task?.archive === false),
  );

  const handleFilterByDateRange = (fromDate, toDate) => {
    const formattedFromDate = formatSelectedDate(fromDate);
    const formattedToDate = formatSelectedDate(toDate);
    // console.log(formattedFromDate, formattedToDate);
    // console.log(allTasks.date);
    const taskDates = allTasks.map(task => task.date);
    // console.log(taskDates);
    const filteredTasks = allTasks.filter(task => {
      const taskDate = task.date; // Assuming task.date is already in the format '20-08-2023'
      return taskDate >= formattedFromDate && taskDate <= formattedToDate;
    });
    // console.log(filteredTasks);
    setFilteredTasks(filteredTasks);
  };
  const getRangeMarkedDates = (startDate, endDate) => {
    const rangeMarkedDates = {};
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const formattedDate = formatSelectedDate(currentDate);
      rangeMarkedDates[formattedDate] = {
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'blue',
      };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return rangeMarkedDates;
  };

  const formatSelectedDate = date => {
    const day = String(date.getDate()).padStart(1, '0');
    const month = String(date.getMonth() + 1).padStart(1, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  //   console.log('priority tasks', priorTasks);
  const handelComplete = id => {
    setIsLoading(true);
    try {
      firestore()
        .collection('Users')
        .doc(userId)
        .collection('Tasks')
        .doc(id)
        .update({completed: true})
        .then(data => {
          setIsLoading(false);
          dispatch(completeTask(id));
          alert('Goal completed sucessfully');
        })
        .catch(() => {
          setIsLoading(false);
          console.log('Task Completed failed');
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handelDelete = id => {
    setIsLoading(true);
    try {
      firestore()
        .collection('Users')
        .doc(userId)
        .collection('Tasks')
        .doc(id)
        .delete()
        .then(() => {
          dispatch(deleteTask(id));
          setIsLoading(false);
          alert('Task deleted!');
        })
        .catch(() => {
          setIsLoading(false);
          console.log('Task deletion failed');
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handelArchive = id => {
    setIsLoading(true);
    try {
      firestore()
        .collection('Users')
        .doc(userId)
        .collection('Tasks')
        .doc(id)
        .update({archive: true})
        .then(data => {
          dispatch(addArchive(id));
          setIsLoading(false);
          alert('Arcived sucessfully');
        })
        .catch(() => {
          setIsLoading(false);
          console.log('Task archive failed');
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handelAddTask = () => {
    setEditingTask('');
    setIsSubTask('');
    setIsVisible(true);
  };
  const addSubtask = mainTaskId => {
    // console.log(mainTaskId);
    setEditingTask('');
    setIsVisible(true);
    setIsSubTask(mainTaskId);
  };
  const handelEditTask = task => {
    // console.log('edite task data', task);
    setIsVisible(true);
    setIsEditing(true);
    setIsSubTask('');
    setEditingTask(task);
  };
  const handelViewSubTask = (subtasks, id) => {
    // console.log(id);
    navigation.navigate('SubTasks', {
      mainTaskID: id,
      subTasks: subtasks,
    });
  };

  const renderItem = ({item}) => (
    <View>
      <View style={styles.taskItem}>
        <View style={styles.statusBtnCon}>
          <View>
            <Text style={styles.tasktitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.priorTaskDateTime} numberOfLines={1}>
              {item.date}
            </Text>
          </View>

          <Text style={styles.taskStatusBtn}>prior</Text>
        </View>
        <View style={{flexDirection: 'row'}}></View>
        <Text style={styles.taskdescription} numberOfLines={3}>
          {item.description}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#f0f0f0',
          width: 150,
          marginBottom: 10,
          marginTop: 2,
          borderWidth: 1,
          padding: 4,
          borderRadius: 10,
        }}>
        {item.subtasks?.length > 0 ? (
          <TouchableOpacity
            onPress={() => handelViewSubTask(item.subtasks, item.id)}>
            <MaterialCommunityIcons
              name="clipboard-list-outline"
              size={20}
              color="blue"
            />
          </TouchableOpacity>
        ) : (
          <Text>Add sub-task now</Text>
        )}
        <FloatingButton
          iconSize={10}
          buttonStyles={{
            height: 20,
            width: 20,
            position: 'relative',
            alignSelf: 'flex-end',
            // marginTop: 10,
            bottom: 0,
            right: 0,
          }}
          onPress={() => {
            addSubtask(item.id);
          }}
        />
      </View>
    </View>
  );

  const renderShowItem = ({item, index}) => (
    <View
      style={{
        // flex: 1,
        backgroundColor: '#cbdfbd',
      }}>
      <TouchableOpacity
        onPress={() => handelEditTask(item)}
        style={styles.rowFront}
        underlayColor={'#fff'}
        activeOpacity={0.5}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={styles.bottomtasktitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.bottomtaskDateTime}>{item.date}</Text>
          </View>

          {item.priority === true ? (
            <Text style={[styles.prioritybtn, {backgroundColor: 'tomato'}]}>
              priority
            </Text>
          ) : item.completed ? (
            <Text style={[styles.prioritybtn, {backgroundColor: 'green'}]}>
              completed
            </Text>
          ) : null}
        </View>
        <Text style={styles.bottomtaskdescription}>{item.description}</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#f0f0f0',

          // width: 150,
          marginBottom: 15,
          marginTop: 0,
          borderWidth: 1,
          padding: 4,
          borderRadius: 10,
        }}>
        {item.subtasks?.length > 0 ? (
          <TouchableOpacity
            onPress={() => handelViewSubTask(item.subtasks, item.id)}>
            <MaterialCommunityIcons
              name="clipboard-list-outline"
              size={20}
              color="blue"
            />
          </TouchableOpacity>
        ) : (
          <Text>Add sub-task now</Text>
        )}
        <FloatingButton
          iconSize={10}
          buttonStyles={{
            height: 20,
            width: 20,
            position: 'relative',
            alignSelf: 'flex-end',
            // marginTop: 10,
            bottom: 0,
            right: 0,
          }}
          onPress={() => {
            addSubtask(item.id);
          }}
        />
      </View>
    </View>
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
      <Loader modalVisible={isLoading} />
      <AddTask
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        editTask={editingTask}
        isSubtask={isSubtask}
        isEditing={isEditing}
      />
      <View style={styles.topFilterCon}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.btnText}>Filter</Text>
          <MaterialCommunityIcons
            name="calendar-search"
            size={25}
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
                      !selectedFromDate ||
                      (selected >= selectedFromDate &&
                        selected <= selectedToDate)
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
                    ...(selectedFromDate &&
                      selectedToDate && {
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
                        ...getRangeMarkedDates(
                          selectedFromDate,
                          selectedToDate,
                        ),
                      }),
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

          {priorityTasks.length <= 0 ? (
            <View
              style={{
                height: 125,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#cbdfbd',
              }}>
              <Text>No priority tasks added yet.</Text>
            </View>
          ) : (
            <View style={{backgroundColor: '#cbdfbd', height: 125}}>
              <FlatList
                data={priorityTasks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                style={styles.taskList}
                horizontal
              />
            </View>
          )}
        </View>
      </View>
      <View style={styles.allTaskCon}>
        <View style={styles.allTaskCon}>
          <View>
            {filteredTasks.length > 0 ? (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.heading}>Filtered Task:</Text>
                <TouchableOpacity
                  style={styles.clearBtn}
                  onPress={() => setFilteredTasks([])}>
                  <Text style={styles.clearBtnText}>Clear-Filter</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.heading}>All Task:</Text>
            )}
            <FloatingButton
              onPress={() => {
                handelAddTask();
              }}
              buttonStyles={{left: 290}}
            />
          </View>
          {nonArchivedTasks.length === 0 ? (
            <View style={styles.noContent}>
              <Text>No tasks added yet. Add a task now!</Text>
            </View>
          ) : (
            <View style={{height: 390}}>
              <SwipeListView
                data={
                  filteredTasks.length !== 0 ? filteredTasks : nonArchivedTasks
                }
                renderItem={renderShowItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
              />
            </View>
          )}
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
    height: 35,
    alignItems: 'center',
    // backgroundColor: 'orange',
  },
  priorityLCon: {
    marginTop: 3,
    padding: 5,
  },
  allTaskCon: {
    padding: 5,
  },
  btn: {
    flexDirection: 'row',
    height: 40,
    width: '90%',
    backgroundColor: '#279EFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
    left: 20,
  },
  filterIcon: {
    right: 10,
  },
  taskItem: {
    // alignItems: 'center',
    backgroundColor: '#f0f0f0',
    // backgroundColor: 'green',
    height: 75,
    width: 150,
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    marginRight: 15,
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
    alignSelf: 'flex-start',
    marginTop: 5,
    left: 5,
  },
  tasktitle: {
    width: 100,
    fontWeight: '500',
    color: 'black',
    fontSize: 12,
  },
  bottomtasktitle: {
    fontWeight: '500',
    color: 'black',
    fontSize: 20,
    left: 7,
    top: 5,
    width: 250,
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
    marginBottom: 10,
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
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  rowFront: {
    // flex: 1,
    backgroundColor: '#f0f0f0',
    borderBottomColor: 'black',
    borderWidth: 0.5,
    // height: 150,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10,
    padding: 5,
  },
  rowBack: {
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center',
    // backgroundColor: 'green',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    height: 50,
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
  noContent: {
    flex: 1,
    // height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cbdfbd',
  },
  clearBtn: {
    // height: 40,
    // width: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 30,
    marginBottom: 8,
    padding: 5,
  },
  clearBtnText: {
    color: 'white',
    fontWeight: '500',
  },
});
