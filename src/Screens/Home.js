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
import Icon from 'react-native-vector-icons/Ionicons';
import SourceImages from '../Images/SourceImages';
import {Calendar} from 'react-native-calendars'; // Import Calendar
import Button from '../Components/Button';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import FloatingButton from '../Components/FlatingButton';
import AddTask from '../Components/AddTask';
const Tab = createBottomTabNavigator();

export default function Home() {
  const navigation = useNavigation();
  const [filteredTasks, setFilteredTasks] = useState([]);

  const username = 'Sara'; // Replace with your username
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
  // Replace with your task data
  const [isVisible, setIsVisible] = useState(false);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [selectedDate, setSelectedDate] = useState(currentDate);
  useEffect(() => {
    handleFilterByDate(selectedDate);
  }, []);
  const [priorTasks, setPriorTasks] = useState([]);

  useEffect(() => {
    const filteredPriorTasks = tasks.filter(item => item.status === 'Prior');
    setPriorTasks(filteredPriorTasks);
  }, []);
  const handleFilterByDate = date => {
    const formattedDate = date.toISOString().split('T')[0];
    // console.log('Formatted Date:', formattedDate);

    const selectedTasks = tasks.filter(task => {
      if (task.dateTime) {
        const [datePart, timePart] = task.dateTime.split(' ');
        const [year, month, day] = datePart.split('-');
        const [hour, minute] = timePart.split(':');
        const isAM = timePart.includes('AM');

        const taskDate = new Date(
          year,
          month - 1, // Months are 0-based in JavaScript
          day,
          isAM ? parseInt(hour) : parseInt(hour) + 12,
          parseInt(minute),
        );

        if (!isNaN(taskDate.getTime())) {
          const taskDateString = taskDate.toISOString().split('T')[0];
          return taskDateString === formattedDate;
        }
      }
      return false; // Filter out tasks with invalid or missing dateTime
    });

    setFilteredTasks(selectedTasks);
  };
  const renderItem = ({item}) => (
    <View style={styles.taskItem}>
      <View
        style={{
          flexDirection: 'row',
          //   backgroundColor: 'red',
          //   alignItems: 'center',
        }}>
        <Text
          style={{
            //   left: -75,
            fontSize: 8,
            fontWeight: '500',
            color: 'black',
            borderWidth: 1,
            borderRadius: 3,
            padding: 3,
            // marginBottom: 10,
            backgroundColor:
              item.status === 'Completed'
                ? 'green'
                : item.status === 'new'
                ? 'blue'
                : item.status === 'Prior'
                ? 'tomato'
                : '#FFFFFF',
          }}>
          {item.status}
        </Text>
        <Text style={styles.taskDateTime}>{item.dateTime}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            //   left: -75,
            fontSize: 8,
            fontWeight: '500',
            color: 'black',
            // marginBottom: 10,
          }}>
          Title:
        </Text>
        <Text style={styles.tasktitle}>{item.title}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            //   left: -75,
            fontSize: 8,
            fontWeight: '500',
            color: 'black',
            marginBottom: 10,
          }}>
          Description:
        </Text>
        <Text style={styles.taskdescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <AddTask setIsVisible={setIsVisible} isVisible={isVisible} />
        <View style={styles.header}>
          <Image style={styles.userImage} source={SourceImages.User} />
          <View>
            <Text style={styles.greeting}>Hello, {username}!</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
        </View>
        <View style={styles.widgetsCon}>
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
                // Set current date as selected
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
            <FlatList
              data={priorTasks}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              style={styles.taskList}
              horizontal // Set this for horizontal display
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Priority-Task');
              }}
              style={{alignSelf: 'flex-start', marginTop: 0}}>
              <Text>View all prior tasks --{'>'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.secoundListCon}>
            {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <FloatingButton onPress={() => setIsVisible(true)} />
          </View> */}
            <Text style={styles.heading}>Todays Task List</Text>

            {/* <Text></Text> */}

            <FlatList
              data={filteredTasks}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              style={styles.taskList}
              horizontal // Set this for horizontal display
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('All-Task')}
            style={{alignSelf: 'flex-start', marginBottom: 30, marginTop: -15}}>
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
    backgroundColor: '#FFFFFF',
    // marginBottom: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    // backgroundColor: 'green',
  },
  userImage: {
    height: 100,
    width: 100,
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
  },
  taskList: {
    marginTop: 5,
    marginBottom: 0,
  },
  taskText: {
    marginLeft: 10,
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
  taskDateTime: {
    fontWeight: '500',
    color: 'black',
    top: -30,
    left: -20,
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

  tasktitle: {
    fontWeight: '500',
    color: 'black',
    fontSize: 8,
  },

  taskdescription: {
    fontWeight: '500',
    color: 'black',
    fontSize: 8,
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
