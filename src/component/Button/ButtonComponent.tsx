import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
} from 'react-native';
import styles from './ButtonStyle';

interface ButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  enabled?: boolean;
  icon?: ImageSourcePropType; // Accepts a source for the icon image
  isBackButton?: boolean; // New prop to check if it's a back button
}

const ButtonComponent: React.FC<ButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  enabled = true,
  icon,
  isBackButton = false, // Default to false if not provided
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, !enabled && styles.disabledButton]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!enabled}>
      {isBackButton && icon && <Image source={icon} style={styles.icon} />}
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      {!isBackButton && icon && <Image source={icon} style={styles.icon} />}
    </TouchableOpacity>
  );
};

export default ButtonComponent;
