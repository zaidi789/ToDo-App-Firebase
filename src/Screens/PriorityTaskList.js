import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useSelector, useDispatch} from 'react-redux';
import {completeTask, deleteTask, removePriority} from '../Redux/TaskSlice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function PriorityTaskList() {
  const userId = auth().currentUser.uid;
  const dispatch = useDispatch();
  const allTasks = useSelector(state => state.allTasks);
  // console.log(allTasks);
  const [priorTaskList, setPriorTaskList] = useState([]);
  useEffect(() => {
    const PriorityTasks = allTasks.filter(item => item.priority === true);
    setPriorTaskList(PriorityTasks);
  }, [allTasks]);

  const handelComplete = id => {
    try {
      firestore()
        .collection('Users')
        .doc(userId)
        .collection('ToDos')
        .doc(id)
        .update({completed: true})
        .then(data => {
          alert('Goal completed sucessfully');
        });
      dispatch(completeTask(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handelDelete = id => {
    try {
      firestore()
        .collection('Users')
        .doc(userId)
        .collection('ToDos')
        .doc(id)
        .delete()
        .then(() => {
          alert('User deleted!');
        });
      dispatch(deleteTask(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handelRemovePriority = id => {
    try {
      firestore()
        .collection('Users')
        .doc(userId)
        .collection('ToDos')
        .doc(id)
        .update({priority: false})
        .then(data => {
          console.log('removed priority');
        });
      dispatch(removePriority(id));
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = item => (
    <TouchableOpacity
      onPress={() => console.log('You touched me')}
      style={styles.rowFront}
      underlayColor={'#fff'}
      activeOpacity={0.92}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={styles.tasktitle} numberOfLines={1}>
            {item.item.title}
          </Text>
          <Text style={styles.taskDateTime}>{item.item.date}</Text>
        </View>
        <Text style={styles.priorBtn}>prior</Text>
      </View>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}></View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.taskdescription}>{item.item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderHiddenItem = item => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.actionButton, styles.completeBtn]}
        onPress={() => handelComplete(item.item.id)}>
        <Text style={styles.btnText}>Completed</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.closeBtn]}
        onPress={() => handelRemovePriority(item.item.id)}>
        <Text style={styles.btnText}>Remove</Text>
        <Text style={styles.btnText}>Priority</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteBtn]}
        onPress={() => handelDelete(item.item.id)}>
        <Text style={styles.btnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerCon}>
        <Text style={styles.headerText}>Priority Tasks</Text>
      </View>
      <View style={styles.listCon}>
        {priorTaskList.length === 0 ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f9bec7',
            }}>
            <Text>No priority added yet.</Text>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: '#edf6f9',
              flex: 1,
              padding: 10,
            }}>
            <SwipeListView
              data={priorTaskList}
              renderItem={renderItem}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'pink',
    padding: 10,
  },
  headerCon: {
    height: 50,
    backgroundColor: '#ee6c4d',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: '800',
    color: 'white',
  },
  listCon: {
    height: 600,
    // backgroundColor: 'yellow',
    marginBottom: 10,
  },
  list: {
    color: '#FFF',
    // marginBottom: 10,
  },
  btnText: {
    color: '#FFF',
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
    alignItems: 'center',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    height: 40,
  },
  actionButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  closeBtn: {
    backgroundColor: 'blue',
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
    right: 246,
    borderRadius: 10,

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
    // marginTop: 8,
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
    width: 240,
    // top: -30,
    // left: -80,
  },
  taskdescription: {
    fontWeight: '300',
    color: 'black',
    fontSize: 14,
    left: 8,
    marginBottom: 5,
  },
  priorBtn: {
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
});
