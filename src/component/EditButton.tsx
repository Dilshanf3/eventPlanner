import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from '../styles/editButtonStyle';
interface EditButtonProps {
  onPress: () => void;
  isEditable: boolean;
}

const EditButton: React.FC<EditButtonProps> = ({onPress, isEditable}) => {
  return (
    <TouchableOpacity style={styles.editButton} onPress={onPress}>
      <Text style={styles.editButtonText}>{isEditable ? 'Save' : 'Edit'}</Text>
    </TouchableOpacity>
  );
};

export default EditButton;
