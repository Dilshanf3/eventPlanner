// InputField.tsx
import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  TextInputProps,
  ImageSourcePropType,
  Text,
} from 'react-native';
import styles from '../styles/inputFieldStyle';
interface InputFieldProps extends TextInputProps {
  icon: ImageSourcePropType;
  secureTextEntry?: boolean;
  showToggle?: boolean;
  toggleShow?: () => void;
  showPasswordIcon?: ImageSourcePropType;
  hidePasswordIcon?: ImageSourcePropType;
  label?: string;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  showToggle,
  toggleShow,
  icon,
  showPasswordIcon,
  hidePasswordIcon,
  label,
  errorMessage,
  ...props
}) => (
  <View style={styles.inputContainer}>
    {label && <Text style={styles.label}>{label}</Text>}
    <View style={styles.innerContainer}>
      <Image source={icon} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      {showToggle && (
        <TouchableOpacity onPress={toggleShow}>
          <Image
            source={secureTextEntry ? showPasswordIcon : hidePasswordIcon}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
    {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
  </View>
);

export default InputField;
