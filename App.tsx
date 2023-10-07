import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomePage1 from './screens/HomePage1'
import HelpPage from './screens/HelpPage';
import ManagerScreen from './screens/ManageScreen'
import FoodDetail from './screens/FoodDetail';
import SearchScreen from './screens/SearchPage'
import ButtonBar from './Components/ButtonBar'
import Restaurant from './screens/Restaurant'
import GetImage from './screens/GetImage';




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
        <Stack.Screen name="HomePage1" component={HomePage1} options={commonScreenOptions}/>
        <Stack.Screen name="HelpPage" component={HelpPage} options={commonScreenOptions}/>
        <Stack.Screen name="ManagerScreen" component={ManagerScreen} options={commonScreenOptions} />
        <Stack.Screen name="FoodDetail" component={FoodDetail} options={commonScreenOptions}/>
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={commonScreenOptions} />
        <Stack.Screen name="ButtonBar" component={ButtonBar} options={{ headerShown: false}} /> 
        <Stack.Screen name="Restaurant" component={Restaurant} options={commonScreenOptions}/>
        <Stack.Screen name="GetImage" component={GetImage} options={{ headerShown: false}}/>

      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App