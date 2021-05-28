import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login/Login';
import RegisterUser from './pages/RegisterUser/RegisterUser';
import StartForgotPassword from './pages/ForgotPassword/StartForgotPassword';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ProductsCustomers from './pages/ProductsCustomers/ProductsCustomers';

import terms from './translation/terms.json';

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="Login">
          <AppStack.Screen name="Login" component={Login} options={{ headerShown: false }}></AppStack.Screen>
          <AppStack.Screen name="RegisterUser" component={RegisterUser} 
              options={{ headerTitle: terms.createNewUser, title: terms.createNewUser }}></AppStack.Screen>
          <AppStack.Screen name="StartForgotPassword" component={StartForgotPassword} 
              ></AppStack.Screen>
          <AppStack.Screen name="ForgotPassword" component={ForgotPassword} 
              ></AppStack.Screen>
          <AppStack.Screen name="ProductsCustomers" component={ProductsCustomers}></AppStack.Screen>
      </AppStack.Navigator>
    </NavigationContainer>
  );
};