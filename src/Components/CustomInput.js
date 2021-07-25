import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {color} from '../Theme/color';
function CustomInput({placeholder, onChangeText}) {
  return (
    <View>
      <TextInput
        style={style.inputContainer}
        placeholder={placeholder}
        placeholderTextColor={color.grey}
        onChangeText={onChangeText}
      />
    </View>
  );
}
const style = StyleSheet.create({
  inputContainer: {
    elevation: 5,
    backgroundColor: color.pureWhite,
    height: 40,
    paddingHorizontal: 8,
    marginVertical: 16,
    borderRadius: 8,
    color: color.black,
  },
});
export default CustomInput;
