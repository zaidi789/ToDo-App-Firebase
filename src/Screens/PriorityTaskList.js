import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useSelector} from 'react-redux';
export default function PriorityTaskList() {
  const allTasks = useSelector(state => state.allTasks);
  // console.log(allTasks);
  const [priorTaskList, setPriorTaskList] = useState([]);
  useEffect(() => {
    const PriorityTasks = allTasks.filter(item => item.priority === true);
    setPriorTaskList(PriorityTasks);
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

            backgroundColor: '#FF1E1E',
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
      <TouchableOpacity
        style={[styles.actionButton, styles.completeBtn]}
        onPress={() => closeItem(rowMap, data.item.key)}>
        <Text style={styles.btnText}>Completed</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.closeBtn]}
        onPress={() => closeItem(rowMap, data.item.key)}>
        <Text style={styles.btnText}>Remove</Text>
        <Text style={styles.btnText}>from</Text>

        <Text style={styles.btnText}>Priority</Text>
      </TouchableOpacity>
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
          <SwipeListView
            data={priorTaskList}
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
