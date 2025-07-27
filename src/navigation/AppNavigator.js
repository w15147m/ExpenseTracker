import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthContext } from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen'; // Import the new screen
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isLoading, session } = useContext(AuthContext); // Use session

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session == null ? (
          // User is not signed in
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          // User is signed in
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ title: 'Dashboard' }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;