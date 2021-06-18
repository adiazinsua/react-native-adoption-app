import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Card from '../components/Card';

import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import COLORS from '../const/colors';

const Home = ({navigation}) => {
  const {logout} = useContext(AuthContext);

  const [value, onChangeValue] = React.useState('');
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [pets, setPets] = useState([]); // Initial empty array of users

  useEffect(() => {
    const subscriber = firestore()
      .collection('pets')
      .onSnapshot(querySnapshot => {
        const pets = [];

        querySnapshot.forEach(documentSnapshot => {
          pets.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setPets(pets);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <View style={styles.container}>
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
              <MaterialIcons
                name="search"
                size={18}
                style={styles.searchIcon}
              />
              <TouchableOpacity>
                <Octicons name="settings" size={18} style={styles.filterIcon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => logout()}
              style={styles.logoutIcon}>
              <AntDesign name="logout" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            <View style={{top: 10, bottom: 10}}>
              <FlatList
                data={pets}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{backgroundColor: 'white'}}
                    onPress={() =>
                      navigation.navigate('Detail', item, navigation)
                    }>
                    <Card
                      image={item.image}
                      name={item.name}
                      age={item.age}
                      sex={item.sex}
                      location={item.location}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={{position: 'absolute', bottom: 15, right: 15}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddPet')}
                style={styles.addIcon}>
                <MaterialIcons name="add" size={35} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FD8B7B',
  },
  header: {flex: 1},
  listContainer: {
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    height: '80%',
  },
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
  addIcon: {
    height: 55,
    width: 55,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  logoutIcon: {
    position: 'absolute',
    padding: 15,
  },
});

export default Home;
