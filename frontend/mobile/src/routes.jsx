import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import IndexIncidents from './pages/incidents/index';
import ShowIncident from './pages/incidents/show';

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions = {{ headerShown: false }}>
        <AppStack.Screen name="IndexIncidents" component={IndexIncidents} />
        <AppStack.Screen name="ShowIncident" component={ShowIncident} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
