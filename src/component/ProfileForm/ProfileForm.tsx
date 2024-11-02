import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import TextInputFieldComponent from '../Input/TextInputField';

interface Field {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
  placeholder?: string;
  error?: string;
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
          {/* Render error message below the input */}
          {field.error ? (
            <Text style={styles.errorText}>{field.error}</Text>
          ) : null}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12, 
    marginTop: 4, 
  },
});

export default ProfileForm;
