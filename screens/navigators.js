import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import WelcomeScreen from './WelcomeScreen';
import AuthScreen from './AuthScreen';
import MapScreen from './MapScreen';
import DeckScreen from './DeckScreen';
import SettingsScreen from './SettingsScreen';
import ReviewScreen from './ReviewScreen';

const MainNavigator = createBottomTabNavigator({
  welcome: WelcomeScreen,
  auth: AuthScreen,
  main: createBottomTabNavigator({
      map: MapScreen,
      deck: DeckScreen,
      Review: createStackNavigator({
          review: ReviewScreen,
          settings: SettingsScreen
        })
    }, {
      tabBarOptions: {
        labelStyle: { fontSize: 12 }
      }
    })
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarVisible: false

  })
});

export const Appnavigators = createAppContainer(MainNavigator)
