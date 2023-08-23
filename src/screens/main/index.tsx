import React, {FC} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TScreenProps} from '../../navigation/constants';
import links from './links';

const Main: FC<TScreenProps<'Main'>> = ({navigation: {navigate}}) => (
  <SafeAreaView>
    <FlatList
      data={links}
      renderItem={({item: {name, route, description}}) => (
        <TouchableOpacity style={[styles.item, !route && styles.itemDisabled]} disabled={!route} onPress={() => route && navigate(route)}>
          <Text style={styles.itemText}>{name}</Text>
          {description && <Text>{description}</Text>}
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.content}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  item: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
    marginBottom: 4,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  content: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
});

export default Main;
