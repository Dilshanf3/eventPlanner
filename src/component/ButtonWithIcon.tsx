import React from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import styles from '../styles/buttonWithIconsStyle';
interface ButtonWithIconProps {
  text: string;
  onPress: () => void;
  iconSource: any;
  backgroundColor: string;
  textColor: string;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  text,
  onPress,
  iconSource,
  backgroundColor,
  textColor,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor}]}
      onPress={onPress}>
      <Text style={[styles.buttonText, {color: textColor}]}>{text}</Text>
      <Image source={iconSource} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default ButtonWithIcon;
