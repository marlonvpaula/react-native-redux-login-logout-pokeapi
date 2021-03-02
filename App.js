import React, {Component} from 'react';
import {createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { StyleSheet, Button } from 'react-native';
import { Provider } from "react-redux";
import store from './app/store';
import { useSelector, useDispatch } from 'react-redux';

import Signin from './app/Components/Usuario/Signin';
import Signup from './app/Components/Usuario/Signup';
import Pokemons from './app/Components/Pokemon/Pokemons';
import Details from './app/Components/Pokemon/Details';

const appNavigator = createStackNavigator({
  Entrar: {
    screen: Signin,
  },
  Signup: {
    screen: Signup,
  },
  Pokemons: {
    screen: Pokemons,
  },
  Detalhes: {
    screen: Details,
  },
},
{
  initialRouteName: 'Entrar',
  defaultNavigationOptions: ({ navigate, navigation }) => ({
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#263238',
      borderBottomColor: '#ffffff',
    },
    headerRight: () => {
      const isAuthenticated = useSelector(state => state.isAuthenticated);
      const dispatch = useDispatch();

      return (
        isAuthenticated?<Button
          title="Sair"
          color='#263238'
          onPress={() => {
            dispatch({ type: 'LOGOUT'})
            
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Entrar' })],
            });
            navigation.dispatch(resetAction);
            return;
          }}
        />:''
    )},
    cardStyle: { backgroundColor: '#546E7A' },
  })
});

const AppContainer = createAppContainer(appNavigator);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

export default App;
