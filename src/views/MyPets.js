import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Card from '../components/Card';
import FlatListData from '../../data/FlatListData';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';

const MyPets = ({navigation}) => {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [pets, setPets] = useState([]); // Initial empty array of users

  useEffect(() => {
    const subscriber = firestore()
      .collection('pets')
      .where('userId', '==', user.uid)
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

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View>
      <Text>My pets uwu</Text>
      <FlatList
        data={pets}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{backgroundColor: 'white'}}
            onPress={() => navigation.navigate('Detail', item, navigation)}>
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
  );
};

export default MyPets;
