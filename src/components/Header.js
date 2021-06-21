import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../navigation/AuthProvider';
const Header = () => {
  const {logout} = useContext(AuthContext);
  const [value, onChangeValue] = useState('');
  return (
    <View style={styles.header}>
      <View style={styles.locationContainer}>
        <Text style={styles.smallText}>Location</Text>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons
            name="location-on"
            size={18}
            color="white"
            style={{margin: 2}}
          />
          <Text style={styles.locationText}>Buenos Aires, Argentina</Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={onChangeValue}
          value={value}
          placeholder="Search"
          placeholderTextColor="white"></TextInput>
        <MaterialIcons name="search" size={18} style={styles.searchIcon} />
        <TouchableOpacity>
          <Octicons name="settings" size={18} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => logout()} style={styles.logoutIcon}>
        <AntDesign name="logout" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {flex: 1},
  locationContainer: {
    alignItems: 'center',
    top: 15,
  },
  smallText: {
    color: 'white',
    fontSize: 12,
  },

  locationText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    top: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchInput: {
    backgroundColor: '#C0564A',
    borderRadius: 10,
    height: 30,
    width: 320,
    fontSize: 16,
    padding: 5,
    paddingLeft: 35,
  },
  searchIcon: {
    color: 'white',
    position: 'absolute',
    padding: 5,
    left: 40,
  },
  filterIcon: {
    color: 'white',
    position: 'absolute',
    padding: 5,
    right: 5,
  },
  logoutIcon: {
    position: 'absolute',
    padding: 15,
  },
});

export default Header;
