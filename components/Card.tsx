import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

export const Card = ({ children }: PropsWithChildren) => <View style={styles.card}>{children}</View>;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10
  }
});
