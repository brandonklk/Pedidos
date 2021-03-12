import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login/Login';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
          <AppStack.Screen name="Login" component={Login} options={{ headerShown: false }}></AppStack.Screen>
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;