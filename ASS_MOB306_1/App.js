import React from 'react';
import { StyleSheet, View } from 'react-native';
import FileBook from './book';



export default function App() {
  return (
      <View style={styles.container}>
        <FileBook/>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
