import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomePage1 from './screens/HomePage1'
import HelpPage from './screens/HelpPage';
import FoodDetail from './screens/FoodDetail';
import SearchScreen from './screens/SearchPage'
import ButtonBar from './Components/ButtonBar'
import Restaurant from './screens/Restaurant'
import AddFoodScreen from './screens/AddFoodScreen';
import UserScreen from './screens/UserScreen';
import UpdateFood from './screens/UpdateFood'

const Stack = createStackNavigator();

const App = () => {

  const commonScreenOptions = {
    headerTitle: '',
    headerBackTitle: 'Trở lại',
    headerShown: true,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={commonScreenOptions}/>
        <Stack.Screen name="HomePage1" component={HomePage1} options={{ headerShown: false}}/>
        <Stack.Screen name="HelpPage" component={HelpPage} options={commonScreenOptions}/>
        <Stack.Screen name="FoodDetail" component={FoodDetail} options={commonScreenOptions}/>
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={commonScreenOptions} />
        <Stack.Screen name="UserScreen" component={UserScreen} options={commonScreenOptions} />
        <Stack.Screen name="ButtonBar" component={ButtonBar} options={{ headerShown: false}} /> 
        <Stack.Screen name="Restaurant" component={Restaurant} options={{ headerShown: false}}/>
        <Stack.Screen name="AddFoodScreen" component={AddFoodScreen} options={commonScreenOptions}/>
        <Stack.Screen name="UpdateFood" component={UpdateFood} options={commonScreenOptions}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App