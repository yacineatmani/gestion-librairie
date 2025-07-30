# Projet : Gestion d'une Librairie - Laravel + React

## Objectif
Créer une **application web** pour **gérer une librairie** : ajout, modification, suppression et recherche de livres, auteurs et catégories.

Apprentissages visés :
- Création d'une **API backend** avec **Laravel**.
- Développement d'une **interface frontend** avec **React**.
- Communication **frontend ↔ backend** via API.

---

## Fonctionnalités à développer

### Livres
- Lister tous les livres.
- Ajouter un livre (titre, auteur, catégorie, année de publication).
- Modifier un livre existant.
- Supprimer un livre.
- Chercher un livre par titre.

### Auteurs
- Lister tous les auteurs.
- Ajouter un auteur.

### Catégories
- Lister toutes les catégories.
- Ajouter une catégorie.

---

## Technologies imposées
- **Backend** : Laravel 12
- **Frontend** : React 18+ avec Vite
- **Librairies** : Bootstrap, tailwind ou bulma
- **Base de données** : MySQL
- **API** : RESTful en JSON

---

## Backend Laravel - Tâches principales

1. **Créer une API REST** :
- Endpoints : `/api/books`, `/api/authors`, `/api/categories`
   
2. **Modèles** :
- `Book`, `Author`, `Category`

3. **Migrations de la base de données** :
- Tables `books`, `authors`, `categories`.

4. **Validation des données** :
- Validation lors de la création et modification.

5. **Configurer CORS** :
- Permettre l'accès à l'API depuis l'application React.

---

## Frontend React - Tâches principales

1. **Configurer un projet React avec Vite**.

2. **Pages principales** :
- Liste des livres
- Ajouter un livre
- Modifier un livre
- Ajouter un auteur
- Ajouter une catégorie

3. **Communication avec l'API** :
- Utiliser **Axios** pour les requêtes HTTP.

4. **Composants React** :
- Formulaires (ajout/modification).
- Tableaux pour affichage.
- Barre de recherche.

5. **Navigation** :
- Utiliser **React Router** pour gérer les routes.

---

## Livrables

- Code backend Laravel propre (avec migrations).
- Code frontend React organisé et fonctionnel.
- Fichier `README.md` expliquant :
- Comment lancer le projet backend.
- Comment lancer le projet frontend.

---

## Bonus

- Pagination pour la liste des livres.
- Fenêtre de confirmation avant suppression.
- Notifications de succès ou d'erreur (toasts).

---

## Conseils pour réussir

- **Commencez par le backend** (API).
- **Testez l’API avec Postman** avant de connecter le frontend.
- Travaillez étape par étape (fonctionnalité par fonctionnalité).

---

