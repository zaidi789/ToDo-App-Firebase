import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useSelector, useDispatch} from 'react-redux';
import {unarchiveTask} from '../Redux/TaskSlice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function ArchieveList() {
  const userId = auth().currentUser.uid;
  const allTasks = useSelector(state => state.allTasks);
  const dispatch = useDispatch();
  const [archiveTask, setArchiveTask] = useState([]);
  useEffect(() => {
    const archiveTasks = allTasks.filter(item => item.archive === true);
    setArchiveTask(archiveTasks);
  }, [allTasks]);

  const handelUnArchive = item => {
    // console.log(item.id);
    // return;
    try {
      firestore()
        .collection('Users')
        .doc(userId)
        .collection('Tasks')
        .doc(item.id)
        .update({archive: false})
        .then(data => {
          dispatch(unarchiveTask(item.id));
          alert('unarchive task sucessfully');
        });
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = item => (
    <TouchableOpacity
      onPress={() => console.log('You touched me')}
      style={styles.rowFront}
      activeOpacity={0.9}>
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
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}></View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.taskdescription}>{item.item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderHiddenItem = (item, idx) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteBtn]}
        onPress={() => handelUnArchive(item.item, idx)}>
        <Text style={styles.btnText}>UnArchive</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerCon}>
        <Text style={styles.headerText}>Archived Tasks</Text>
      </View>
      <View style={styles.listCon}>
        {archiveTask.length === 0 ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#cce3de',
            }}>
            <Text>No Archive added yet.</Text>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: '#edf6f9',
              flex: 1,
              padding: 10,
            }}>
            <SwipeListView
              data={archiveTask}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={0}
              rightOpenValue={-75}
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
    backgroundColor: '#ced4da',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: '800',
    color: 'black',
  },
  listCon: {
    height: 600,
    // backgroundColor: 'yellow',
    marginBottom: 10,
    backgroundColor: '#cce3de',
  },
  list: {
    color: '#FFF',
    // marginBottom: 10,
  },
  btnText: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#f0f0f0',
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
});
