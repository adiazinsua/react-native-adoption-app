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

import Card from '../components/Card';

import firestore from '@react-native-firebase/firestore';
import AddButton from '../components/AddButton';
import Header from '../components/Header';

const Home = ({navigation}) => {
  
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
          <Header />
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
                      image={item.petImg}
                      name={item.name}
                      age={item.age}
                      sex={item.sex}
                      location={item.location}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
            <AddButton></AddButton>
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

  listContainer: {
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    height: '80%',
  },
});

export default Home;
