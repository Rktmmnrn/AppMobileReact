import db from '../database/db';

export interface Chanteur {
  idchant?: number;      // optionnel car absent avant l'insertion en BD
  nom: string;
  datenais: string;
  photo: string;
}

// CREATE — ajouter un nouveau chanteur
export const addChanteur = (chanteur: Chanteur): void => {
  db.runSync(
    'INSERT INTO chanteur (nom, datenais, photo) VALUES (?, ?, ?);',
    [chanteur.nom, chanteur.datenais, chanteur.photo]
  );
};

// READ — récupérer tous les chanteurs
export const getAllChanteurs = (): Chanteur[] => {
  return db.getAllSync<Chanteur>('SELECT * FROM chanteur ORDER BY nom ASC;');
};

// READ — récupérer un seul chanteur par son id
export const getChanteurById = (id: number): Chanteur | null => {
  const result = db.getFirstSync<Chanteur>(
    'SELECT * FROM chanteur WHERE idchant = ?;',
    [id]
  );
  return result ?? null;
};

// UPDATE — modifier un chanteur existant
export const updateChanteur = (chanteur: Chanteur): void => {
  db.runSync(
    'UPDATE chanteur SET nom = ?, datenais = ?, photo = ? WHERE idchant = ?;',
    [chanteur.nom, chanteur.datenais, chanteur.photo, chanteur.idchant!]
  );
};

// DELETE — supprimer un chanteur
export const deleteChanteur = (id: number): void => {
  db.runSync('DELETE FROM chanteur WHERE idchant = ?;', [id]);
};

// SEARCH — rechercher des chanteurs par nom (recherche partielle)
export const searchChanteursByNom = (nom: string): Chanteur[] => {
  return db.getAllSync<Chanteur>(
    'SELECT * FROM chanteur WHERE nom LIKE ? ORDER BY nom ASC;',
    [`%${nom}%`]
  );
};