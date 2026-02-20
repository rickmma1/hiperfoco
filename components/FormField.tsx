import { Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export const FormField = ({ control, name, label, ...inputProps }: any) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <View style={styles.wrap}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.input} value={String(value ?? '')} onChangeText={onChange} {...inputProps} />
        {error && <Text style={styles.error}>{error.message}</Text>}
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  wrap: { marginBottom: 10 },
  label: { color: '#e5e7eb', marginBottom: 4 },
  input: { backgroundColor: '#374151', color: '#fff', borderRadius: 8, padding: 10 },
  error: { color: '#fca5a5', marginTop: 4 }
});
