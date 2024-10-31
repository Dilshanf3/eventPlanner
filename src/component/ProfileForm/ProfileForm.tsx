import React from 'react';
import {TextInput, Text, View, StyleSheet} from 'react-native';
import TextInputFieldComponent from '../Input/TextInputField';

interface Field {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
  placeholder?: string;
}

interface DynamicReusableFormProps {
  fields: Field[];
}

const ProfileForm: React.FC<DynamicReusableFormProps> = ({fields}) => {
  return (
    <View>
      {fields.map((field, index) => (
        <View key={index} style={styles.container}>
          <TextInputFieldComponent
            value={field.value}
            onChangeText={field.onChangeText}
            editable={field.editable}
            placeholder={field.placeholder}
            label={field.label}
            enableUnderLine={false}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default ProfileForm;
