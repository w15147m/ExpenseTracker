import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// 1. Import the Supabase client
import { supabase } from './src/lib/supabase';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#222' : '#FFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };

  // 2. Add the useEffect hook to test the connection
  useEffect(() => {
    const testConnection = async () => {
      console.log('Attempting to fetch data from "status" table...');
      
      const { data, error } = await supabase
        .from('status')
        .select('*');

      if (error) {
        console.error('❌ Connection failed:', error.message);
      } else {
        console.log('✅ Connection successful! Data:', data);
      }
    };

    testConnection();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View>
        <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#000' }]}>
          Expense Tracker
        </Text>
        <Text style={[styles.subtitle, { color: isDarkMode ? '#CCC' : '#333' }]}>
          Check the debug console for the connection status.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default App;