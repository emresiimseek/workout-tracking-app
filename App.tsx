if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
import {STRAPI_API_URL, STRAPI_TOKEN} from '@env';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import CreateProgramPage from './app/screens/CreateProgramPage';
import {HomePage} from './app/screens/HomePage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@rneui/base';
import {UserPage} from './app/screens/User';
import colors from './app/styles/colors';
import {navigationRef} from './app/RootNavigation';

const client = new ApolloClient({
  uri: STRAPI_API_URL,
  headers: {
    Authorization: `Bearer ${STRAPI_TOKEN}`,
  },
  cache: new InMemoryCache({
    typePolicies: {
      Program: {merge: true},
    },
  }),
});

const Tab = createBottomTabNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <ApolloProvider client={client}>
          <Tab.Navigator
            screenOptions={({route, navigation}) => ({
              tabBarIcon: ({focused}) => {
                if (route.name == 'Programs')
                  return (
                    <Icon
                      name="list"
                      type="material"
                      size={30}
                      color={focused ? colors.secondColor : 'gray'}
                    />
                  );
                else if (route.name == 'Create Program')
                  return (
                    <Icon
                      name="add-circle-outline"
                      type="material"
                      size={38}
                      color={focused ? colors.secondColor : 'gray'}
                    />
                  );
                else if (route.name == 'User')
                  return (
                    <Icon
                      name="account-circle"
                      type="material"
                      size={30}
                      color={focused ? colors.secondColor : 'gray'}
                    />
                  );
              },

              headerTitleAlign: 'center',
              tabBarShowLabel: false,
              headerShown: true,
              tabBarStyle: {backgroundColor: colors.firstColor, height: 60},
              headerStyle: {backgroundColor: colors.firstColor},
              headerTitleStyle: {color: colors.secondColor},
            })}>
            <Tab.Screen name="Programs" component={HomePage} />
            <Tab.Screen name="Create Program" component={CreateProgramPage} />
            <Tab.Screen name="User" component={UserPage} />
          </Tab.Navigator>
        </ApolloProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
