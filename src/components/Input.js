import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";
import COLORS from "../const/colors";

const Input = ({ labelValue, placeholderText, iconType, ...rest }) => {
  return (
    <View style={styles.inputContainer}>
      <MaterialIcons
        name={iconType}
        size={20}
        color="#ACACAC"
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        value={labelValue}
        placeholder={placeholderText}
        placeholderTextColor={COLORS.darkgrey}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row"
  },
  icon: {
    position: "absolute",
    marginTop: 15,
    left: 5
  },
  input: {
    borderBottomWidth: 1,
    borderColor: COLORS.lightgrey,
    width: 300,
    height: 48,
    fontSize: 16,
    paddingLeft: 40,
  }
});

export default Input;