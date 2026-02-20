import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { ModalWarning } from '@/components/ModalWarning';
import { saveProfile } from '@/services/profileService';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);
  const [over18, setOver18] = useState(false);
  const [dataConsent, setDataConsent] = useState(false);
  const [nonPrescribed, setNonPrescribed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const complete = async () => {
    if (!acceptedDisclaimer || !over18 || !dataConsent) return;
    await saveProfile({
      heightCm: 170,
      weightKg: 70,
      activityLevel: 'sedentario',
      trainingDays: 0,
      goal: 'manter',
      onboardingDone: true,
      acceptedDisclaimer,
      over18,
      dataConsent,
      nonPrescribedFlag: nonPrescribed
    });
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Consult coaching (Edu)</Text>
      {step === 1 && (
        <>
          <Text style={styles.text}>Não é aconselhamento médico. Procure profissional habilitado.</Text>
          <Row label="Li e entendi" value={acceptedDisclaimer} onChange={setAcceptedDisclaimer} />
        </>
      )}
      {step === 2 && <Row label="Confirmo que tenho 18+" value={over18} onChange={setOver18} />}
      {step === 3 && (
        <>
          <Row label="Aceito uso local/offline e exportação" value={dataConsent} onChange={setDataConsent} />
          <Row
            label="Uso substâncias não prescritas (somente para registro)"
            value={nonPrescribed}
            onChange={(v: boolean) => {
              setNonPrescribed(v);
              if (v) setShowModal(true);
            }}
          />
        </>
      )}

      <View style={styles.actions}>
        {step < 3 ? (
          <Pressable style={styles.btn} onPress={() => setStep((s) => s + 1)}>
            <Text style={styles.btnText}>Próximo</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.btn} onPress={complete}>
            <Text style={styles.btnText}>Concluir</Text>
          </Pressable>
        )}
      </View>
      <ModalWarning visible={showModal} onClose={() => setShowModal(false)} />
    </View>
  );
}

const Row = ({ label, value, onChange }: any) => (
  <View style={styles.row}>
    <Text style={styles.text}>{label}</Text>
    <Switch value={value} onValueChange={onChange} />
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#030712', padding: 16, justifyContent: 'center' },
  title: { color: 'white', fontSize: 24, fontWeight: '700', marginBottom: 18 },
  text: { color: '#e5e7eb', flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, gap: 12 },
  actions: { marginTop: 18, alignItems: 'flex-end' },
  btn: { backgroundColor: '#2563eb', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 10 },
  btnText: { color: '#fff', fontWeight: '700' }
});
