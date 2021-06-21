import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../const/colors';
import {useNavigation} from '@react-navigation/native';

const AddButton = () => {
  const navigation = useNavigation();
  return (
    <View style={{position: 'absolute', bottom: 15, right: 15}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddPet')}
        style={styles.addIcon}>
        <MaterialIcons name="add" size={35} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addIcon: {
    height: 55,
    width: 55,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
});

export default AddButton;
