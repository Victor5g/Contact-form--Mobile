import React from 'react';

import{ NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import ContacForm from './screens/ContactForm/index';

export default function Routes(){
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name="ContacForm" component={ContacForm}/>
      </Navigator>
    </NavigationContainer>

  );
}