import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getProfile } from '@/services/profileService';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    getProfile()
      .then((p) => {
        if (p?.onboarding_done) router.replace('/(tabs)');
        else router.replace('/onboarding');
      })
      .catch(() => router.replace('/onboarding'));
  }, [router]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#030712' }}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}
