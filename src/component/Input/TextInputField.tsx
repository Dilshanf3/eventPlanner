import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import styles from './TextInputFieldStyle';

interface TextInputFieldProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
  placeholder?: string;
  secureTextEntry?: boolean;
  showToggle?: boolean;
  toggleShow?: () => void;
  icon?: any; // Icon on the left side of the input
  showPasswordIcon?: any; // Icon to show password
  hidePasswordIcon?: any; // Icon to hide password
  iconPosition?: 'left' | 'right'; // Icon positioning
  enableUnderLine: boolean;
}

const TextInputFieldComponent: React.FC<TextInputFieldProps> = ({
  label,
  value,
  onChangeText,
  editable = true,
  placeholder,
  secureTextEntry = false,
  showToggle = false,
  toggleShow,
  icon,
  showPasswordIcon,
  hidePasswordIcon,
  iconPosition = 'left',
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.innerContainer}>
        {icon && iconPosition === 'left' && (
          <Image source={icon} style={styles.icon} />
        )}
        <TextInput
          style={[
            styles.input,
            icon && iconPosition === 'right'
              ? {paddingRight: 20}
              : {paddingLeft: 20},
          ]}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          placeholder={placeholder}
          placeholderTextColor="#444749"
          secureTextEntry={secureTextEntry}
          {...rest}
        />
        {icon && iconPosition === 'right' && (
          <Image source={icon} style={styles.icon} />
        )}
        {showToggle && (
          <TouchableOpacity onPress={toggleShow} style={styles.toggleIcon}>
            <Image
              source={secureTextEntry ? showPasswordIcon : hidePasswordIcon}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
      {}
      <View style={styles.bottomLine} />
    </View>
  );
};

export default TextInputFieldComponent;
