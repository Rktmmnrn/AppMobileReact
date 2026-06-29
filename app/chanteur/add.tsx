import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { addChanteur } from '@/models/ChanteurModel';

export default function AddScreen() {
  const router = useRouter();
  const [nom, setNom] = useState('');
  const [datenais, setDatenais] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const pickImage = async () => {
    // Demande la permission d'accéder à la galerie
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission refusée', "L'accès à la galerie est nécessaire pour choisir une photo.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!nom.trim()) {
      Alert.alert('Champ requis', 'Le nom est obligatoire.');
      return;
    }

    addChanteur({
      nom: nom.trim(),
      datenais: datenais.trim(),
      photo: photo ?? '',
    });

    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.form}>
        <Pressable style={styles.photoPicker} onPress={pickImage}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <View style={[styles.photo, styles.photoPlaceholder]}>
              <ThemedText>📷 Choisir une photo</ThemedText>
            </View>
          )}
        </Pressable>

        <ThemedText style={styles.label}>Nom</ThemedText>
        <TextInput
          style={styles.input}
          value={nom}
          onChangeText={setNom}
          placeholder="Ex: Edith Piaf"
        />

        <ThemedText style={styles.label}>Date de naissance</ThemedText>
        <TextInput
          style={styles.input}
          value={datenais}
          onChangeText={setDatenais}
          placeholder="Ex: 1915-12-19"
        />

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <ThemedText style={styles.saveText}>Enregistrer</ThemedText>
        </Pressable>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16 },
  form: { gap: 12 },
  photoPicker: { alignSelf: 'center', marginBottom: 12 },
  photo: { width: 120, height: 120, borderRadius: 60 },
  photoPlaceholder: {
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#34A853',
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  saveText: { color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 16 },
});