import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SourceImages from '../Images/SourceImages';
import {Calendar} from 'react-native-calendars'; // Import Calendar
import {useNavigation} from '@react-navigation/native';
import FloatingButton from '../Components/FlatingButton';
import AddTask from '../Components/AddTask';
import {useSelector} from 'react-redux';

export default function Home() {
  const reduxtasks = useSelector(state => state.allTasks);
  const username = 'Sara';
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [todayTask, setTodayTasks] = useState([]);
  const [priorTasks, setPriorTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  // console.log('Today tsaks ------', todayTask);
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formatSelectedDate = date => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const [formattedDateForTask, setFormattedDateForTask] = useState(
    formatSelectedDate(new Date()),
  );
  useEffect(() => {
    const filteredPriorTasks = reduxtasks.filter(
      item => item.priority === true,
    );
    const filteredTodayTasks = reduxtasks.filter(
      item => item.date === formattedDateForTask,
    );
    // console.log(filteredTodayTasks);

    setPriorTasks(filteredPriorTasks);
    setTodayTasks(filteredTodayTasks);
  }, [reduxtasks]);

  const handleFilterByDate = date => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    // console.log(formattedDate);
    const filteredTasks = reduxtasks.filter(
      task => task.date === formattedDate,
    );
    // console.log('filtered Tasks', filteredTasks);
    setFilteredTasks(filteredTasks);
  };

  const renderItem = ({item}) => (
    <View style={styles.taskItem}>
      <View style={styles.statusBtnCon}>
        <View>
          <Text style={styles.tasktitle}>{item.title}</Text>
          <Text style={styles.taskDateTime}>{item.date}</Text>
        </View>

        {item.priority && (
          <Text
            style={[
              styles.taskStatusBtn,
              {
                backgroundColor: 'tomato',
              },
            ]}>
            prior
          </Text>
        )}
      </View>
      <View style={{flexDirection: 'row'}}></View>

      <Text style={styles.taskdescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <AddTask setIsVisible={setIsVisible} isVisible={isVisible} />
        <View style={styles.headerCon}>
          <Image style={styles.userImage} source={SourceImages.User} />
          <View>
            <Text style={styles.greeting}>Hello, {username}!</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
        </View>
        <View style={{padding: 5, backgroundColor: '#ff99ac'}}>
          <Calendar
            onDayPress={day => {
              const selected = new Date(day.dateString);
              setSelectedDate(selected);
              handleFilterByDate(selected);
            }}
            markedDates={{
              [selectedDate.toISOString().split('T')[0]]: {
                selected: true,
                disableTouchEvent: false,
                selectedColor: 'green',
              },
              [new Date().toISOString().split('T')[0]]: {
                //  current date as selected
                selected: true,
                disableTouchEvent: false,
                selectedColor: 'blue',
              },
            }}
          />
        </View>

        <>
          <View style={styles.firstListCon}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.heading}>Priority Task List</Text>
            </View>
            {priorTasks.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#c7f9cc',
                }}>
                <Text>No Prior Tasks Yet</Text>
              </View>
            ) : (
              <FlatList
                data={priorTasks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                style={styles.taskList}
                horizontal // Set this for horizontal display
              />
            )}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Priority-Task');
              }}
              style={{alignSelf: 'flex-start', marginTop: 0}}>
              <Text>View all prior tasks --{'>'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.secoundListCon}>
            <Text style={styles.heading}>
              {filteredTasks.length > 0
                ? 'Filtered Tasks'
                : "Today's Task List"}
            </Text>

            {todayTask.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#c7f9cc',
                }}>
                <Text>No Prior Tasks Yet</Text>
              </View>
            ) : (
              <FlatList
                data={filteredTasks.length > 0 ? filteredTasks : todayTask}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                style={styles.taskList}
                horizontal // Set this for horizontal display
              />
            )}
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('All-Task')}
            style={{alignSelf: 'flex-start', marginBottom: 30, marginTop: 5}}>
            <Text>View all tasks --{'>'}</Text>
          </TouchableOpacity>
        </>
      </ScrollView>
      <FloatingButton onPress={() => setIsVisible(true)} />
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
  headerCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    // backgroundColor: 'green',
  },
  userImage: {
    height: 100,
    width: 100,
    backgroundColor: '#d0f4de',
    borderRadius: 60,
    marginRight: 10,
  },

  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: '#e0e1dd',
    width: '100%',
    padding: 10,
    marginBottom: 5,
  },
  taskList: {
    marginTop: 5,
    marginBottom: 0,
  },
  firstListCon: {
    height: 170,
    marginTop: 10,

    // backgroundColor: 'red',
  },
  secoundListCon: {
    height: 170,
    marginTop: 10,
    // backgroundColor: 'green',
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
  },
  statusBtnCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskDateTime: {
    fontWeight: '500',
    color: 'gray',
    fontSize: 8,
    // top: -30,
    // left: -20,
  },
  widgetsCon: {
    // height: 300,
    // width: '100%',
    // backgroundColor: 'green',
    // alignItems: 'center',
  },
  priorityTaskItem: {
    // alignItems: 'center',
    backgroundColor: '#f0f0f0',
    // backgroundColor: 'green',
    height: 110,
    width: 150,
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    marginRight: 15,
  },
  taskItem: {
    // alignItems: 'center',
    backgroundColor: '#f0f0f0',
    // backgroundColor: 'green',
    height: 110,
    width: 150,
    // flexWrap: 'wrap',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    marginRight: 15,
  },

  tasktitle: {
    fontWeight: '500',
    color: 'black',
    fontSize: 12,
    width: 100,
    // flexWrap: 'wrap',
    // alignSelf: 'center',
    // top: 6.5,
    // left: 3,
  },

  taskdescription: {
    fontSize: 10,
    fontWeight: '500',
    color: 'black',
    marginBottom: 10,
    marginTop: 5,
  },
  addTaskModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 5,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
