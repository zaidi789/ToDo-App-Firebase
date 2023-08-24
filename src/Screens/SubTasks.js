import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import FloatingButton from '../Components/FlatingButton';
import AddTask from '../Components/AddTask';
import {useSelector, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import Loader from '../Components/Loader';
import {SwipeListView} from 'react-native-swipe-list-view';
import firestore from '@react-native-firebase/firestore';
import {deleteSubtask} from '../Redux/TaskSlice';

export default function SubTasks({route}) {
  const {mainTaskID, mainTaskIndex} = route.params;
  // console.log('main task index is', mainTaskID);
  const userId = auth()?.currentUser?.uid;
  const reduxtasks = useSelector(state => state?.allTasks);
  const user = useSelector(state => state?.user);
  const dispatch = useDispatch();
  const subtaskData = [reduxtasks[mainTaskIndex].subtasks];
  const subTaskData = subtaskData.flat();
  console.log(subTaskData);

  //   const allTasks = useSelector(state => state.tasks);

  const username = 'Sara';
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubtask, setIsSubTask] = useState('');
  const [editSubTask, setEditSubTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [subTasks, setSubTasks] = useState([]);
  const [mainTID, setMainTID] = useState(mainTaskID);
  // console.log(mainTID);
  useEffect(() => {
    if (subTaskData.length === 0) {
      navigation.navigate('Home');
    }
  }, [handleDeleteSubtask]);
  const handleDeleteSubtask = async subtaskId => {
    try {
      const parentTaskId = mainTaskID;
      await firestore()
        .collection('Users')
        .doc(userId)
        .collection('Tasks')
        .doc(parentTaskId)
        .update({
          subtasks: firestore.FieldValue.arrayRemove(subtaskId),
        })
        .then(() => {
          dispatch(deleteSubtask({parentTaskId, subtaskId}));
        });

      alert('Sub-task deleted successfully.');
    } catch (error) {
      console.error('Error deleting subtask:', error);
    }
  };

  const renderShowItem = item => (
    <View
      style={{
        backgroundColor: '#edf6f9',
      }}>
      <TouchableOpacity
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
              {item.item.title}
            </Text>
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
        <Text style={styles.bottomtaskdescription}>
          {item.item.description}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderHiddenItem = item => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteBtn]}
        onPress={() => handleDeleteSubtask(item.item.id)}>
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
        editSubTask={editSubTask}
        isEditing={isEditing}
      />
      <View style={styles.headertitle}>
        <Text style={styles.headerText}>Sub-Tasks</Text>
      </View>
      <View style={styles.listView}>
        <SwipeListView
          data={subTaskData}
          renderItem={renderShowItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-75}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#d0f4de',
    // marginBottom: 1,
  },
  headertitle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    // backgroundColor: 'green',
    backgroundColor: '#edf2f4',
    height: 50,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    // width: '100%',
    alignSelf: 'center',
    color: 'black',
  },
  listView: {
    flex: 1,
    backgroundColor: '#edf6f9',
    borderRadius: 5,
  },
  rowFront: {
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderWidth: 1,
    // height: 150,
    marginBottom: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  rowBack: {
    marginTop: 5,
    marginBottom: 10,
    // alignItems: 'center',
    backgroundColor: '#edf6f9',
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',

    paddingLeft: 5,
    height: 50,
    // justifyContent: 'center',
  },
  actionButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: 5,
    width: 75,
  },
  // closeBtn: {
  //   backgroundColor: 'blue',
  //   right: 75,
  // },
  deleteBtn: {
    backgroundColor: 'blue',
    right: 0,
    borderRadius: 10,
  },
  completeBtn: {
    backgroundColor: 'green',
    right: 264,
    // left: -500,
  },
  taskDateTime: {
    fontWeight: '500',
    // color: 'black',
    fontSize: 12,
    // marginRight: 5,
    alignSelf: 'flex-start',
    // top: -25,
    left: 8,
    marginTop: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginBottom: 5,
    left: 5,
  },
  tasktitle: {
    fontWeight: '500',
    color: 'black',
    fontSize: 20,
    left: 7,
    top: 5,
    width: 240,
    // left: -80,
  },
  taskdescription: {
    fontWeight: '300',
    color: 'black',
    fontSize: 14,
    // top: -30,
    left: 5,
    marginBottom: 5,
  },
  prioritybtn: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
    borderWidth: 1,
    borderRadius: 3,
    padding: 2,
    color: 'white',
    right: 10,
    top: 5,
    height: 25,
    backgroundColor: '#FF1E1E',
  },
  completedBtn: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
    borderWidth: 1,
    borderRadius: 3,
    padding: 2,
    color: 'white',
    right: 10,
    top: 5,
    height: 25,
    backgroundColor: '#FF1E1E',
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
    marginTop: 5,
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
    // height: 150,
    marginBottom: 10,
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
