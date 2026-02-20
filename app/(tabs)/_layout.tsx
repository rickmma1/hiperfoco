import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#111827' },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#111827' },
        tabBarActiveTintColor: '#60a5fa',
        tabBarInactiveTintColor: '#9ca3af'
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="daily" options={{ title: 'Log Diário' }} />
      <Tabs.Screen name="training" options={{ title: 'Treino' }} />
      <Tabs.Screen name="health" options={{ title: 'Saúde' }} />
      <Tabs.Screen name="library" options={{ title: 'Biblioteca' }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
      <Tabs.Screen name="substances" options={{ title: 'Substâncias', href: null }} />
      <Tabs.Screen name="export" options={{ title: 'Exportar', href: null }} />
    </Tabs>
  );
}
