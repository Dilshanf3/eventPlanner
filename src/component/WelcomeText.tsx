import React from 'react';
import {Text} from 'react-native';
import {Strings} from '../constants/strings';
import styles from '../styles/welcomeTextStyle';

interface WelcomeTextProps {
  message: string;
}

const WelcomeText: React.FC<WelcomeTextProps> = ({message}) => {
  return (
    <>
      <Text style={styles.welcomeTitle}>{Strings.welcome}</Text>
      <Text style={styles.welcomeSubtitle}>{message}</Text>
    </>
  );
};

export default WelcomeText;
