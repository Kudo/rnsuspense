import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Main from './src/Main';

export default function App() {
  return (
    <View style={styles.container}>
      <Main />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
