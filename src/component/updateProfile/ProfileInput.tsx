import React from 'react';
import {View, Text, TextInput} from 'react-native';
import styles from '../../styles/profileInputStyle';
interface ProfileInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  editable: boolean;
  placeholder?: string;
}

const ProfileInput: React.FC<ProfileInputProps> = ({
  label,
  value,
  onChangeText,
  editable,
  placeholder,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          editable ? styles.inputEnabled : styles.inputDisabled,
        ]}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9"
      />
    </View>
  );
};


export default ProfileInput;
