import { StyleSheet, Text, View } from 'react-native';

export const WarningBanner = ({ text }: { text?: string }) => (
  <View style={styles.root}>
    <Text style={styles.text}>{text ?? 'Não é aconselhamento médico. Procure profissional habilitado.'}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: { backgroundColor: '#7f1d1d', borderRadius: 10, padding: 10, marginVertical: 10 },
  text: { color: '#fff', fontWeight: '700' }
});
