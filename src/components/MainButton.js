import React from "react";
import { TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import COLORS from "../const/colors";

const MainButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Text style={styles.buttonTitle}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 48,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: COLORS.secondary
  },

  buttonTitle: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: "center"
  }
});

export default MainButton;