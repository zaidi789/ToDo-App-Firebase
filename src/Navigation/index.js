import * as React from 'react';
import {Animated} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import icon library (you can use any library or custom icons)
import Start from '../Screens/Start';
import Home from '../Screens/Home';
import SignIn from '../Screens/SignIn';
import Signup from '../Screens/SignUp';
import AllTaskList from '../Screens/AllTaskList';
import CompletedTaskList from '../Screens/CompletedTaskList';
import PriorityTaskList from '../Screens/PriorityTaskList';
import ArchieveList from '../Screens/ArchieveList';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'All-Task') {
            iconName = 'list-circle-sharp';
          } else if (route.name === 'Completed-Task') {
            iconName = 'checkmark-done-circle-sharp';
          } else if (route.name === 'Priority-Task') {
            iconName = 'alert-circle-sharp';
          } else if (route.name === 'ArchieveList') {
            iconName = 'archive-sharp';
          }

          const iconSize = focused ? size + 8 : size;

          return (
            <Animated.View
              style={{
                transform: [{scale: focused ? 1.0 : 0.8}],
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons name={iconName} size={iconSize} color={color} />
            </Animated.View>
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          // tabBarStyle: {display: 'none'},
        }}
      />
      <Tab.Screen
        name="All-Task"
        component={AllTaskList}
        options={{
          headerShown: false,
          // tabBarStyle: {display: 'none'},
        }}
      />
      <Tab.Screen
        name="Priority-Task"
        component={PriorityTaskList}
        options={{
          headerShown: false,
          // tabBarStyle: {display: 'none'},
        }}
      />
      <Tab.Screen
        name="ArchieveList"
        component={ArchieveList}
        options={{
          headerShown: false,
          // tabBarStyle: {display: 'none'},
        }}
      />
      <Tab.Screen
        name="Completed-Task"
        component={CompletedTaskList}
        options={{
          headerShown: false,
          // tabBarStyle: {display: 'none'},
        }}
      />
    </Tab.Navigator>
  );
}

export default function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Start}
          name="Start"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={SignIn}
          name="SignIn"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Signup}
          name="Signup"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={HomeTabs}
          name="HomeTabs"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
