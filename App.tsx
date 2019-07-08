import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation'

import { Route } from './src/constants'
import { mock } from './src/mocks/fetch-mock'

import { ActionCreator } from './src/reducer/data/data'
import reducer from './src/reducer/index'

import withAuthorization from './src/hocs/with-authorization/with-authorization'

import SignInScreen from './src/components/authorization/authorization'
import InfoScreen from './src/components/info/info'
import ArticleListScreen from './src/components/article-list/article-list'

const SignInScreenWrapped = withAuthorization(SignInScreen)

const navigationHeaderOptions = {
  headerStyle: {
    backgroundColor: "#BB0D02",
  },
  headerTintColor: "#FFFFFF",
  headerTitleStyle: {
    fontWeight: "bold",
  },
}

const AppStack = createStackNavigator(
  {
    Details: InfoScreen,
    Home: ArticleListScreen,
  },
  {
    initialRouteName: Route.HOME,
    defaultNavigationOptions: navigationHeaderOptions
  }
)

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreenWrapped
  },
  {
    initialRouteName: Route.SIGN_IN,
    defaultNavigationOptions: navigationHeaderOptions
  }
)

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: Route.AUTH,
  }
))

class App extends React.Component {
  render() {
    const store = createStore(reducer)
    store.dispatch(ActionCreator.setArticles(mock.articles))

    return <Provider store={store}>
      <AppContainer />
    </Provider>
  }
}

export default App
