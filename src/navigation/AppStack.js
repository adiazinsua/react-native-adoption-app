import 'react-native-gesture-handler';
import React from 'react';

import Home from '../views/Home';
import Detail from '../views/Detail';
import AddPet from '../views/AddPet';
import COLORS from '../const/colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import MyPets from '../views/MyPets';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen
        name="AddPet"
        component={AddPet}
        options={{headerShown: true, title: 'Add a pet'}}
      />
    </Stack.Navigator>
  );
};

const PetStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="My Pets" component={MyPets} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen
        name="AddPet"
        component={AddPet}
        options={{headerShown: true, title: 'Add a pet'}}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Detail' || routeName === 'AddPet') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: COLORS.primary,
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="My Pets"
        component={PetStack}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="pets" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          tabBarVisible: getTabBarVisibility(route),
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Messages"
        component={FeedStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="chatbox-ellipses" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
