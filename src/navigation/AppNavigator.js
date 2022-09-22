import React from 'react';
import { View,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthContext } from '../contexts/AuthContext';
import Icons from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/Entypo'

import Header from '../components/Header'
import Home  from '../screens/Frontend/Home'
import Product from '../screens/Frontend/Product';
import AddProduct from '../screens/Frontend/AddProduct';
import Register from '../screens/Authentication/Register'
import Login from '../screens/Authentication/Login'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
      <Tab.Navigator >
        <Tab.Screen name="Home" component={Home} 
        options={
          {
            headerShown: false,
            tabBarShowLabel: false,
            // tabBarLabel:"Books",
            tabBarIcon: ({ color, size }) => (
              <Icons name="home" color={color} size={size} />
            )}} />
        <Tab.Screen name="Products" component={Product} 
        options={
          {
            headerShown: false,
            tabBarShowLabel: false,
            // tabBarLabel:"Books",
            tabBarIcon: ({ color, size }) => (
              <Icons name="building" color={color} size={size} />
            )}} 
        />
        <Tab.Screen name="AddProduct" component={AddProduct} 
        options={
          {
            headerShown: false,
            tabBarShowLabel: false,
            // tabBarLabel:"Books",
            tabBarIcon: ({ color, size }) => (
              <Icon name="add-to-list" color={color} size={size} />
            )}} 
        />
      </Tab.Navigator>
    );
  }
export default function App() {
    const {isAuthenticated} = useAuthContext()
  return (
    <NavigationContainer>
    {isAuthenticated? <Header /> : ""}
    <Stack.Navigator  initialRouteName = "Register">
        {isAuthenticated
        ?
        <Stack.Group>
        <Stack.Screen name="root" component={MyTabs} options={{
            headerShown: false
        }} />
        </Stack.Group>
        :
        <Stack.Group>
        <Stack.Screen name="Register" component={Register} options={{
            headerShown: false
        }} />
        <Stack.Screen name="Login" component={Login} options={{
            headerShown: false
        }} />
        </Stack.Group>
}
      </Stack.Navigator>
    </NavigationContainer>
  );
}