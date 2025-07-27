import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext'; // We will create this next

const LoginScreen = () => {
  const { signIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <Button
        title="Sign In"
        onPress={() => {
          // In a real app, you'd get this from your API (e.g., Supabase)
          signIn('dummy-auth-token'); 
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default LoginScreen;