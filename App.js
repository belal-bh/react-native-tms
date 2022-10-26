import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomHeaderLeft from './src/components/CustomHeaderLeft';
import CustomHeaderTitle from './src/components/CustomHeaderTitle';
import CustomHeaderRight from './src/components/CustomHeaderRight';

import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import TaskAddScreen from './src/screens/TaskAddScreen';
import TaskUpdateScreen from './src/screens/TaskUpdateScreen';
import MembersScreen from './src/screens/MembersScreen';
import MemberDetailScreen from './src/screens/MemberDetailScreen';
import MemberAddScreen from './src/screens/MemberAddScreen';
import MemberUpdateScreen from './src/screens/MemberUpdateScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'TasksTab') {
            iconName = focused ? 'list-circle' : 'list';
          } else if (route.name === 'MembersTab') {
            iconName = focused ? 'people-circle' : 'people-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Tab.Screen
        name="TasksTab"
        component={TasksScreen}
        options={{title: 'Tasks'}}
      />
      <Tab.Screen
        name="MembersTab"
        component={MembersScreen}
        options={{title: 'Members'}}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#00a0db',
            color: 'white',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // headerLeft: props => <CustomHeaderLeft {...props} />,
          headerTitle: props => <CustomHeaderTitle {...props} />,
          headerRight: props => <CustomHeaderRight {...props} />,
        }}>
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="Members" component={MembersScreen} />
        <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
        <Stack.Screen name="TaskAddScreen" component={TaskAddScreen} />
        <Stack.Screen name="TaskUpdateScreen" component={TaskUpdateScreen} />
        <Stack.Screen
          name="MemberDetailScreen"
          component={MemberDetailScreen}
        />
        <Stack.Screen name="MemberAddScreen" component={MemberAddScreen} />
        <Stack.Screen
          name="MemberUpdateScreen"
          component={MemberUpdateScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
