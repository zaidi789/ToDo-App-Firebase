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

  const closeItem = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const handelDelete = id => {
    console.log(id);
    // dispatch(deleteTask(id));
  };

  const onItemOpen = rowKey => {
    console.log('This row opened', rowKey);
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
            // marginBottom: 10,
            backgroundColor: 'green',
          }}>
          {item.item.status}
        </Text>
        <Text style={styles.taskDateTime}>{item.item.dateTime}</Text>
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
          <Text style={styles.tasktitle}>{item.item.title}</Text>
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
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#99d98c',
            }}>
            <Text>No Completed added yet.</Text>
          </View>
        ) : (
          <SwipeListView
            data={completedTasks}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-150}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onItemOpen}
          />
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
    // backgroundColor: 'green',
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
  closeBtn: {
    backgroundColor: 'blue',
    right: 75,
  },
  deleteBtn: {
    backgroundColor: 'red',
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
    color: 'black',
    fontSize: 12,
    marginRight: 5,
    alignSelf: 'flex-start',
    // top: -25,
    // left: 8,
    marginTop: 8,
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
    fontSize: 14,
    left: 7,
    // top: -30,
    // left: -80,
  },
  taskdescription: {
    fontWeight: '500',
    color: 'black',
    fontSize: 14,
    // top: -30,
    left: 5,
  },
});
