import * as SQLite from 'expo-sqlite';

// Ouvre (ou crée) le fichier de base de données "chanteurs.db" sur le téléphone
const db = SQLite.openDatabaseSync('chanteurs.db');

// Crée la table CHANTEUR
export const initDB = (): void => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS chanteur (
      idchant INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      datenais TEXT,
      photo TEXT
    );
  `);
};

export default db;