import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons  from "react-native-vector-icons/MaterialIcons";
import MainButton from "../components/MainButton";
import COLORS from "../const/colors";

const Detail = ({ navigation, route }) => {
  const pet = route.params;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/prueba/Child_face.jpg")}
        style={styles.image}
      >
        <View style={styles.header}>
          <AntDesign
            name="back"
            size={30}
            color="white"
            onPress={navigation.goBack}
          />
        </View>
      </ImageBackground>
      <View style={styles.descContainer}>
        <TouchableOpacity style={styles.favIcon}>
          <AntDesign name="hearto" size={25} color={COLORS.primary} />
        </TouchableOpacity>
        <Text
          style={{
            width: "70%",
            fontSize: 30,
            fontWeight: "bold",
            color: COLORS.secondary,
            padding: 20
          }}
        >
          {pet.name}
        </Text>

        <View style={{ marginHorizontal: 20 }}>
          <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <MaterialIcons
              name="location-on"
              size={30}
              color={COLORS.secondary}
            />
            <Text style={{ fontWeight: "bold", fontSize: 18, paddingLeft: 5 }}>
              {pet.location}
            </Text>
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>
            Description
          </Text>
          <Text style={{ fontSize: 16 }}>
            Little Timmy was a villager who first appeared in Warcraft III:
            Reign of Chaos. He was a young boy and son of Alicia. Prince Arthas
            rescued Timmy at the behest of his mother.
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginVertical: 20
          }}
        >
          <View style={styles.smallContainer}>
            <Text style={styles.infoText}>{pet.age}</Text>
            <Text style={styles.titleText}>Age</Text>
          </View>
          <View style={styles.smallContainer}>
            <Text style={styles.infoText}>{pet.sex}</Text>
            <Text style={styles.titleText}>Sex</Text>
          </View>
          <View style={styles.smallContainer}>
            <Text style={styles.infoText}>None</Text>
            <Text style={styles.titleText}>Breed</Text>
          </View>
          <View style={styles.smallContainer}>
            <Text style={styles.infoText}>5 years</Text>
            <Text style={styles.titleText}>Age</Text>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <MainButton buttonTitle="Contactar" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    backgroundColor: "red"
  },
  image: {
    flex: 0.7,
    width: "100%",
    height: 300
  },
  header: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  imageDetails: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 10
  },
  favIcon: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    elevation: 2,
    position: "absolute",
    top: -25,
    alignSelf: "flex-end",
    right: 25
  },
  descContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20
  },
  smallContainer: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkgrey,
    borderWidth: 1,
    borderRadius: 10,

    width: 75,
    height: 55,
    justifyContent: "center",
    alignItems: "baseline",
    padding: 12
  },
  infoText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "grey"
  },
  titleText: {
    color: "#ACACAC"
  }
});

export default Detail;