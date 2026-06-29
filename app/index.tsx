import { useCallback, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Chanteur, deleteChanteur, getAllChanteurs } from '@/models/ChanteurModel';
import { initDB } from '@/database/db';

export default function ListScreen() {
  const router = useRouter();
  const [chanteurs, setChanteurs] = useState<Chanteur[]>([]);

  // Recharge la liste chaque fois que l'écran redevient visible
  // (utile après un ajout/modification/suppression sur un autre écran)
  useFocusEffect(
    useCallback(() => {
      initDB();
      setChanteurs(getAllChanteurs());
    }, [])
  );

  const handleDelete = (id: number) => {
    deleteChanteur(id);
    setChanteurs(getAllChanteurs());
  };

  return (
    <ThemedView style={styles.container}>
      <Pressable style={styles.searchButton} onPress={() => router.push('/search')}>
        <ThemedText style={styles.buttonText}>🔍 Rechercher</ThemedText>
      </Pressable>

      <Pressable style={styles.addButton} onPress={() => router.push('/chanteur/add')}>
        <ThemedText style={styles.buttonText}>+ Ajouter un chanteur</ThemedText>
      </Pressable>

      <FlatList
        data={chanteurs}
        keyExtractor={(item) => String(item.idchant)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <ThemedText style={styles.empty}>Aucun chanteur enregistré.</ThemedText>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/chanteur/${item.idchant}`)}>
            {item.photo ? (
              <Image source={{ uri: item.photo }} style={styles.photo} />
            ) : (
              <View style={[styles.photo, styles.photoPlaceholder]} />
            )}
            <View style={styles.cardInfo}>
              <ThemedText style={styles.nom}>{item.nom}</ThemedText>
              <ThemedText>{item.datenais}</ThemedText>
            </View>
            <Pressable
              style={styles.deleteButton}
              onPress={() => handleDelete(item.idchant!)}>
              <ThemedText style={styles.deleteText}>🗑️</ThemedText>
            </Pressable>
          </Pressable>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  searchButton: {
    backgroundColor: '#3478F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#34A853',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  list: { gap: 10 },
  empty: { textAlign: 'center', marginTop: 40, opacity: 0.6 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(150,150,150,0.1)',
    gap: 12,
  },
  photo: { width: 56, height: 56, borderRadius: 28 },
  photoPlaceholder: { backgroundColor: '#ccc' },
  cardInfo: { flex: 1 },
  nom: { fontSize: 16, fontWeight: '600' },
  deleteButton: { padding: 8 },
  deleteText: { fontSize: 18 },
});