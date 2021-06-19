import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Input from '../components/Input';
import MainButton from '../components/MainButton';

import {AuthContext} from '../navigation/AuthProvider';

import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-picker/picker';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const AddPet = () => {
  const {user} = useContext(AuthContext);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedSex, setSelectedSex] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [location, setLocation] = useState('');

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const submitPet = async () => {
    const imageUrl = await uploadImage();

    firestore()
      .collection('pets')
      .add({
        userId: user.uid,
        name: name,
        age: age,
        type: selectedType,
        sex: selectedSex,
        size: selectedSize,
        location: location,
        petImg: imageUrl,
      })
      .then(() => {
        console.log('Post Added!');
        alert('Post published!', 'Your post has been published Successfully!');
        //setPost(null);
      })
      .catch(error => {
        console.log(
          'Something went wrong with added post to firestore.',
          error,
        );
      });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 780,
      height: 780,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <View /* style={styles.imageContainer} */>
          {image != null ? (
            <View>
              <Image source={{uri: image}} /* style={styles.imagePreview} */ />
            </View>
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Button
                title="Pick an image from camera roll"
                onPress={choosePhotoFromLibrary}
              />
            </View>
          )}
        </View>

        <View style={styles.formContainer}>
          <Input
            labelValue={name}
            placeholderText="Name"
            iconType="pets"
            onChangeText={setName}
          />

          <Input
            labelValue={age}
            placeholderText="Age"
            iconType="cake"
            onChangeText={setAge}
          />

          <View style={styles.pickerContainer}>
            <Picker
              style={styles.defaultPicker}
              selectedValue={selectedType}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedType(itemValue)
              }>
              <Picker.Item label="Dog" value="dog" />
              <Picker.Item label="Cat" value="cat" />
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              style={styles.defaultPicker}
              selectedValue={selectedSex}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedSex(itemValue)
              }>
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              style={styles.defaultPicker}
              selectedValue={selectedSize}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedSize(itemValue)
              }>
              <Picker.Item label="Small" value="small" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="Big" value="big" />
            </Picker>
          </View>

          <Input
            labelValue={location}
            placeholderText="Location"
            iconType="location-on"
            onChangeText={setLocation}
          />

          <MainButton buttonTitle="Add pet" onPress={() => submitPet()} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultPicker: {
    height: 30,
    width: 300,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
  },
  imageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2e64e515',
  },
  imagePreview: {
    width: '100%',
    height: '250%',
    marginBottom: 15,
  },
});

export default AddPet;
