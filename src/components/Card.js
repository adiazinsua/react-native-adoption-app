import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import  MaterialIcons from "react-native-vector-icons/MaterialIcons";
import  Foundation  from "react-native-vector-icons/Foundation";
import COLORS from "../const/colors";

const Card = (props) => {
  return (
    <View style={styles.cardContainer}>
      <View style={{ justifyContent: "center" }}>
        <Image style={styles.imageContainer} source={props.image}></Image>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{props.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.cardDescription}>{props.age} years</Text>
          <Text style={styles.cardDescription}> | </Text>
          <Text style={styles.cardDescription}>{props.sex}</Text>
          {props.sex == "male" ? (
            <Foundation name="male-symbol" size={14} style={styles.icon} />
          ) : (
            <Foundation name="female-symbol" size={14} style={styles.icon} />
          )}
        </View>
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={14} color={COLORS.white} />
          <Text style={styles.cardLocation}>{props.location}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    width: 320,
    height: 120,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightgrey,
    shadowColor: COLORS.dark,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 4,
    flexDirection: "row",
    alignSelf: "center"
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10
  },
  cardTitle: {
    fontSize: 18,
    color: COLORS.dark,
    fontWeight: "bold"
  },
  cardDescription: {
    fontSize: 12,
    color: COLORS.darkgrey,
    fontWeight: "bold"
  },
  cardLocation: {
    fontSize: 12,
    color: "#848484"
  },
  icon: {
    color: COLORS.secondary,
    left: 5
  },
  textContainer: {
    top: 10,
    flex: 1
  },
  locationContainer: {
    flexDirection: "row",
    top: 40
  }
});

export default Card;