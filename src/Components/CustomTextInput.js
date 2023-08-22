import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomTextInput = props => {
  const {
    label,
    style,
    onBlur,
    onFocus,
    placeholder,
    errorText,
    isPassword,
    isUserName,
    onChangeText,
    value,
    labelStyle,
    isEmail,
    ...restOfProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const borderColor = errorText ? '#B00020' : isFocused ? 'blue' : '#8d99ae';
  const labelColor = errorText ? '#B00020' : isFocused ? '#080F9C' : '#8d99ae';

  const leftIconName = isEmail
    ? 'mail-outline'
    : isPassword
    ? 'lock-closed-outline'
    : isUserName
    ? 'person-outline'
    : '';

  const rightIconName = isPassword
    ? isVisible
      ? 'eye-off-outline'
      : 'eye-outline'
    : '';

  return (
    <View style={style}>
      <View style={[styles.inputContainer, {borderColor}]}>
        {leftIconName ? (
          <View
            style={{
              height: 52,
              width: 52,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: errorText
                ? '#B00020'
                : isFocused
                ? 'blue'
                : '#8d99ae',
            }}>
            <Icon
              name={leftIconName}
              size={21}
              color={labelColor}
              style={styles.leftIcon}
            />
          </View>
        ) : null}
        <TextInput
          style={styles.input}
          {...restOfProps}
          placeholder={isFocused ? placeholder : ''}
          secureTextEntry={isVisible}
          onChangeText={onChangeText}
          value={value}
          onBlur={event => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={event => {
            setIsFocused(true);
            onFocus?.(event);
          }}
        />
        {rightIconName ? (
          <TouchableOpacity
            onPress={() => {
              setIsVisible(!isVisible);
            }}
            style={styles.rightIconContainer}>
            <Icon name={rightIconName} size={20} color={labelColor} />
          </TouchableOpacity>
        ) : null}
      </View>

      {!value && (
        <View
          style={[
            styles.labelContainer,
            labelStyle,
            {top: isFocused ? -8.5 : 15, left: isFocused ? 40 : 40},
          ]}>
          <Text
            style={[
              styles.label,
              {color: labelColor, fontSize: isFocused ? 12 : 16},
            ]}>
            {label}
          </Text>
        </View>
      )}

      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    position: 'absolute',
    left: 16,
    top: -9,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  label: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 0,
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    fontFamily: 'Avenir-Medium',
    fontSize: 16,
    left: -15,
  },
  leftIcon: {
    marginRight: 0,
  },
  rightIconContainer: {
    padding: 8,
  },
  error: {
    marginTop: 4,
    marginLeft: 12,
    left: -10,
    fontSize: 12,
    color: '#B00020',
    fontFamily: 'Avenir-Medium',
  },
});

export default CustomTextInput;
