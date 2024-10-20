import React from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import styles from '../styles/nextButtonStyle';

interface NextButtonProps {
  onPress: () => void;
  buttonText: string;
}

const NextButton: React.FC<NextButtonProps> = ({onPress, buttonText}) => {
  return (
    <TouchableOpacity style={styles.nextButton} onPress={onPress}>
      <Text style={styles.nextButtonText}>{buttonText}</Text>
      <Image
        source={require('../assets/images/arrow.png')}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );
};

export default NextButton;
