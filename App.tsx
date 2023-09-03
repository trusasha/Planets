import {LogBox, StyleSheet, View} from 'react-native';
import MainStack from './src/navigation/main';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useEffect} from 'react';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <View style={styles.flex}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
