import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import Input from "../components/Input";
import MainButton from "../components/MainButton";
import { AuthContext } from "../navigation/AuthProvider";

import { Picker } from "@react-native-picker/picker";

const AddPet = () => {
  const { user, setUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [selectedSex, setSelectedSex] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [breed, setBreed] = useState("");
  const [location, setLocation] = useState("");

  const [image, setImage] = useState("null");

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image != null ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : null}
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
            selectedValue={selectedSex}
            onValueChange={(itemValue, itemIndex) => setSelectedSex(itemValue)}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            style={styles.defaultPicker}
            selectedValue={selectedSize}
            onValueChange={(itemValue, itemIndex) => setSelectedSize(itemValue)}
          >
            <Picker.Item label="Small" value="small" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Big" value="big" />
          </Picker>
        </View>
        <Input
          labelValue={breed}
          placeholderText="Breed"
          iconType="pets"
          onChangeText={setBreed}
        />

        <Input
          labelValue={location}
          placeholderText="Location"
          iconType="location-on"
          onChangeText={setLocation}
        />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button title="Pick an image from camera roll"  />
        </View>
        <MainButton buttonTitle="Add pet" onPress={() => alert("Pet added")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  defaultPicker: {
    height: 30,
    width: 300
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10
  },
  imageContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2e64e515"
  },
  imagePreview: {
    width: "100%",
    height: "250%",
    marginBottom: 15
  }
});

export default AddPet;