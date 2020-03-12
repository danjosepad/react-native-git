import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

function Routes() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleStyle: {
              alignSelf: 'center',
            },
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: '#7159c1',
            },
            headerTintColor: '#FFF',
          }}
        >
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ title: 'Usuários' }}
          />
          <Stack.Screen name="User" component={User} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default Routes;
