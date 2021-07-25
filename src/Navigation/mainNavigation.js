import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from '../Auth/Login/login';
import NewChat from '../NewChat/NewChat';
const Stack = createStackNavigator();

function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="NewChat" component={NewChat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainNavigation;
