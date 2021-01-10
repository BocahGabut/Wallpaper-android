import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Dashboard from './component/Dashboard'
import Category from './component/Category'
import DetailImage from './component/DetailsImage'
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
import DetailCategory from './component/DetailsCategory'

const Stack = createStackNavigator();

const App = () => {
  admob()
  .setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.PG,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: true,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,
  })
  .then(() => {
    // Request config successfully set!
  });
  return (
    <NavigationContainer style={{ flex:1 }} >
      <StatusBar barStyle="light-content" translucent /> 
      <Stack.Navigator initialRouteName="Home"  screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={Dashboard} />
        <Stack.Screen name="Details" component={DetailImage} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="DetailCategory" component={DetailCategory} />
      </Stack.Navigator>
    </NavigationContainer> 
  );
}
export default App;
