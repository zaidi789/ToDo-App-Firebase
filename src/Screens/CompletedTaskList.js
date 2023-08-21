import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useSelector, useDispatch} from 'react-redux';
import {deleteTask} from '../Redux/TaskSlice';
export default function CompletedTaskList() {
  const allTasks = useSelector(state => state.allTasks);
  const dispatch = useDispatch();
  const [completedTasks, setCompletedTasks] = useState([]);
  useEffect(() => {
    const completeTasks = allTasks.filter(item => item.completed === true);
    setCompletedTasks(completeTasks);
  }, [allTasks]);

  const handelDelete = id => {
    // console.log(id);
    dispatch(deleteTask(id));
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

        <Text style={styles.completeBtn}>completed</Text>
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
        style={[styles.actionButton, styles.deleteBtn]}
        onPress={() => handelDelete(item.item.id)}>
        <Text style={styles.btnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerCon}>
        <Text style={styles.headerText}>Completed Tasks</Text>
      </View>
      <View style={styles.listCon}>
        {completedTasks.length === 0 ? (
          <View style={styles.noContent}>
            <Text>No Completed added yet.</Text>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: '#99d98c',
              flex: 1,
              padding: 10,
            }}>
            <SwipeListView
              data={completedTasks}
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
    backgroundColor: '#43aa8b',
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
    borderWidth: 0.5,
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
    backgroundColor: '#99d98c',
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
  },
  deleteBtn: {
    backgroundColor: 'red',
    right: 1,
    borderRadius: 10,
    borderWidth: 0.5,
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
    left: 10,
    top: 5,
    width: 230,
    // marginRight: 5,
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
  completeBtn: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
    borderWidth: 1,
    borderRadius: 3,
    padding: 3,
    marginTop: 5,
    color: 'white',
    height: 25,
    marginRight: 10,
    backgroundColor: 'green',
  },
  noContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#99d98c',
  },
});
