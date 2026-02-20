import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

export const ModalWarning = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>Atenção</Text>
        <Text style={styles.body}>
          Este app é educacional e de organização para consulta. Não oferece orientação de uso de substâncias ou medicações.
        </Text>
        <Pressable onPress={onClose} style={styles.button}>
          <Text style={styles.buttonText}>Entendi</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#0008', alignItems: 'center', justifyContent: 'center' },
  modal: { width: '85%', backgroundColor: '#111827', borderRadius: 12, padding: 16 },
  title: { color: '#fff', fontSize: 20, fontWeight: '700' },
  body: { color: '#e5e7eb', marginVertical: 12 },
  button: { backgroundColor: '#2563eb', borderRadius: 8, padding: 10, alignSelf: 'flex-end' },
  buttonText: { color: '#fff', fontWeight: '700' }
});
