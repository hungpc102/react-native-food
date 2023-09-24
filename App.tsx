import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomePage1 from './screens/HomePage1'
import HelpPage from './screens/HelpPage';
import HomePage2 from './screens/HomePage2';
import ManagerScreen from './screens/manageScreen'

const Stack = createStackNavigator();

const App = () => {
  const commonScreenOptions = {
    headerTitle: '',
    headerBackTitle: 'Trở lại',
    headerShown: true,
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={commonScreenOptions} />
        <Stack.Screen name="HomePage1" component={HomePage1} options={commonScreenOptions} />
        <Stack.Screen name="HelpPage" component={HelpPage} options={commonScreenOptions} />
        <Stack.Screen name="HomePage2" component={HomePage2} options={commonScreenOptions} />
        <Stack.Screen name="ManagerScreen" component={ManagerScreen} options={commonScreenOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;