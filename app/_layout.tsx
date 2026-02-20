import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { getDb } from '@/db/client';

export default function RootLayout() {
  useEffect(() => {
    getDb().catch(console.error);
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
