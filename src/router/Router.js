import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomHeaderLeft from '../components/CustomHeaderLeft';
import CustomHeaderTitle from '../components/CustomHeaderTitle';
import CustomHeaderRight from '../components/CustomHeaderRight';

import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import TaskAddScreen from '../screens/TaskAddScreen';
import TaskUpdateScreen from '../screens/TaskUpdateScreen';
import MembersScreen from '../screens/MembersScreen';
import MemberDetailScreen from '../screens/MemberDetailScreen';
import MemberAddScreen from '../screens/MemberAddScreen';
import MemberUpdateScreen from '../screens/MemberUpdateScreen';

import RNBootSplash from 'react-native-bootsplash';

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

export default Router = () => {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
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
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
        <Stack.Screen name="TaskAdd" component={TaskAddScreen} />
        <Stack.Screen name="TaskUpdate" component={TaskUpdateScreen} />
        <Stack.Screen name="MemberDetail" component={MemberDetailScreen} />
        <Stack.Screen name="MemberAdd" component={MemberAddScreen} />
        <Stack.Screen name="MemberUpdate" component={MemberUpdateScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
