import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import COLORS from "../const/colors";

const BrandButton = ({ image, ...rest }) => {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Image style={styles.buttonImage} source={image}></Image>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 115,
    height: 48,
    borderRadius: 10,
    borderColor: COLORS.lightgrey,
    backgroundColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2
  },

  buttonImage: {
    height: 32,
    width: 95,
    alignSelf: "center"
  }
});

export default BrandButton;