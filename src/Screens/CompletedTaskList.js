import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

export default function CompletedTaskList() {
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
  const [completedTasks, setCompletedTasks] = useState([]);
  useEffect(() => {
    const completeTasks = tasks.filter(item => item.status === 'Completed');
    setCompletedTasks(completeTasks);
  }, []);

  const closeItem = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteItem = (rowMap, rowKey) => {
    closeItem(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
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

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      {/* <TouchableOpacity
        style={[styles.actionButton, styles.completeBtn]}
        onPress={() => closeItem(rowMap, data.item.key)}>
        <Text style={styles.btnText}>Completed</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        style={[styles.actionButton, styles.closeBtn]}
        onPress={() => closeItem(rowMap, data.item.key)}>
        <Text style={styles.btnText}>Close</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteBtn]}
        onPress={() => deleteItem(rowMap, data.item.key)}>
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
        <SwipeListView
          data={completedTasks}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-75}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onItemOpen}
        />
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
