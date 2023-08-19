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
import {unarchiveTask} from '../Redux/TaskSlice';

export default function ArchieveList() {
  const allTasks = useSelector(state => state.allTasks);
  const dispatch = useDispatch();
  const [archiveTask, setArchiveTask] = useState([]);
  useEffect(() => {
    const archiveTasks = allTasks.filter(item => item.archive === true);
    setArchiveTask(archiveTasks);
  }, [allTasks]);

  const closeItem = (item, id) => {
    if (item[id]) {
      item[id].closeRow();
    }
  };

  const deleteItem = (rowMap, rowKey) => {
    closeItem(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const handelUnArchive = (item, idx) => {
    closeItem(item, idx);
    // console.log(item.id);
    dispatch(unarchiveTask(item.id));
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
        <Text style={styles.headerText}>Archieve Tasks</Text>
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
          <SwipeListView
            data={archiveTask}
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
