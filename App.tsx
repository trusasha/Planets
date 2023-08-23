import {StyleSheet, View} from 'react-native';
import MainStack from './src/navigation/main';
import { NavigationContainer } from '@react-navigation/native';

const App = () => (
  <View style={styles.flex}>
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  </View>
);

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
