import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Liste des chanteurs' }} />
        <Stack.Screen name="chanteur/add" options={{ title: 'Ajouter un chanteur' }} />
        <Stack.Screen name="chanteur/[id]" options={{ title: 'Détail du chanteur' }} />
        <Stack.Screen name="search" options={{ title: 'Recherche' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}