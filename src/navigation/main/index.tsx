import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import screens, { TScreensParams } from '../constants';
import Main from '../../screens/main';
import Lesson1 from '../../screens/lesson-1';
import Lesson2 from '../../screens/lesson-2';
import Lesson3 from '../../screens/lesson-3';
import Lesson4 from '../../screens/lesson-4';

const Stack = createNativeStackNavigator<TScreensParams>();

const MainStack = () => (
  <Stack.Navigator initialRouteName={screens.main}>
    <Stack.Screen name={screens.main} component={Main} />
    <Stack.Screen name={screens.lesson1} component={Lesson1} />
    <Stack.Screen name={screens.lesson2} component={Lesson2} />
    <Stack.Screen name={screens.lesson3} component={Lesson3} />
    <Stack.Screen name={screens.lesson4} component={Lesson4} />
  </Stack.Navigator>
);

export default MainStack;
