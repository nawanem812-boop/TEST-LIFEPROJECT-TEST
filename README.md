# Programme Major de Promo

Site statique (aucun serveur, aucune dépendance) : stages, recherche, publications, dossier passerelle, finance, santé, compétences, formations, projets, réseau, portfolio/CV, plan 2026-2036.

Les parties Cours, TD et QCM ne font plus partie de ce site : il est dédié au reste du parcours (stages → recherche → passerelle → capital). Utilise ton autre site pour la partie scolaire.

## Mise en ligne sur GitHub Pages
1. Crée un dépôt, puis envoie tous les fichiers à la racine (index.html, app.js, style.css, sw.js, manifest.json, icon.svg).
2. Settings → Pages → Source : branche `main`, dossier `/ (root)` → Save.
3. Ouvre l'URL indiquée, puis « Ajouter à l'écran d'accueil » pour l'installer.

## Où sont tes données
- Enregistrées à chaque modification dans le navigateur (localStorage) **et** copiées dans IndexedDB ; si l'un est vidé, l'autre restaure.
- Le stockage est demandé en mode « persistant » et sauvegardé quand tu quittes la page.
- Elles sont propres à ton navigateur et à ton appareil : **exporte un .json chaque semaine** (onglet Données, rappel automatique après 7 jours).
- Changer de navigateur, de téléphone ou vider les données du site les efface : importe ton dernier .json exporté depuis CE site.

## Nouveautés de cette version
- **Modification des entrées** : chaque carte a un bouton ✎ qui ouvre le formulaire pré-rempli ; enregistrer met à jour l'entrée existante au lieu d'en créer une nouvelle. Un bouton « Annuler » permet de sortir du mode édition.
- **Recherche instantanée** : chaque liste (Stages, Recherche, Publications, Passerelle, Finance…) a une barre de recherche qui filtre en direct sur tous les champs, sans recharger la page — utile quand les listes deviennent longues au fil des années.
- **Finance en temps réel** : un « Solde total » est recalculé automatiquement à chaque ajout/modification/suppression = revenus + épargne + investissements − dépenses − formations. Par exemple, 300 € d'épargne puis une dépense de 20 € affiche immédiatement 280 €.
- **Interface plus fluide** : transitions sur les boutons, cartes et champs, retour visuel au clic, focus mis en valeur sur les champs actifs.
- **Portfolio / CV** et **indicateur de progression composite** (ajoutés à la version précédente) toujours présents.

## Nouveautés v4 — tracker passerelle
- **État du dossier** : score = 60 % qualité des preuves (faible 1 / solide 2 / très solide 3) + 40 % checklist, au lieu d'un simple volume.
- **Checklist du dossier & calendrier** : pièces, lettre, recommandations, oral, dépôt ; statut, échéance, alerte de retard, lignes modifiables. Liste générale : vérifie les règles officielles de l'université.
- **5 axes** avec jauge de poids par axe et zone de récit (lettre / oral). Chaque preuve a maintenant un axe, une force et un justificatif.
- **Filtres** par semestre et par axe dans la liste des preuves.
- **Onglet 📊 Notes & rang** : notes pondérées, moyenne par semestre, évolution, rang moyen (top X %), alerte sous 10/20.
- Le portfolio PDF reprend notes, force et justificatifs. Tes données existantes restent valables (anciennes preuves = « solide » par défaut).

## Mettre à jour le site
Modifie les fichiers dans le dépôt : tes données ne sont pas touchées. Pour forcer la mise à jour du cache hors-ligne, change `V` dans sw.js (déjà fait pour cette version).

## v5 — fiabilité
- Les mêmes fichiers servent pour LIFE-PROJECT et TEST-LIFEPROJECT : si l'adresse contient « test », mode TEST (bandeau rouge, clé `test:majorpromo_v3`, base IndexedDB `test:majorpromo`).
- Import : validation du fichier, aperçu entrées actuelles → après import, sauvegarde automatique téléchargée avant. Export : date, version et environnement inclus.
- Dates en heure locale. Alerte visible si l'enregistrement échoue. Cache hors-ligne propre à ce site (ne supprime plus ceux des autres).

## v6 — refonte visuelle et dashboard
- Navigation hiérarchisée : barre latérale sur ordinateur, barre du bas + menu sur téléphone, rubrique active en surbrillance, retour au tableau de bord, raccourcis vers les rubriques les plus utilisées, menu « Mon écosystème » avec statuts.
- Dashboard : accueil, date, période du parcours, frise 2026-2036, échéances, actions prioritaires, indicateurs indépendants (pas de score unique), graphiques (notes, recherche, sommeil), résumés stages / finance / compétences, état de Routine et de Multi-DA (lecture seule).
- Identité « Scientific Editorial » : vert forêt, corail, doré, fond clair cassé, titres Fraunces, motif végétal discret, mode sombre (automatique / clair / sombre).

## v8 — complété
- Mêmes fichiers pour LIFE-PROJECT et TEST-LIFEPROJECT (mode TEST automatique). Deux DA ajoutées : « Sable & Corail » et « Encre & Or » (Données > Thème, ou menu).
- Notes & rang : lit les notes de Multi-DA (source de saisie), ECTS séparés des coefficients, moyennes par UE / semestre / année, types d'épreuve, classement, évaluations à venir, UE à consolider.
- Stages : synthèse des 10 compétences cliniques depuis Multi-DA et envoi en preuve vers le dossier passerelle. Champs stages, recherche, publications, formations, projets et réseau enrichis.
- Passerelle : synthèse automatique, éligibilité, calendrier officiel, checklist d'oral, questions/réponses, recommandations, lettre de motivation, projet médical.
- Finance : liquidités, épargne, investissements et patrimoine séparés ; transferts non comptés comme revenus ; soldes d'ouverture, fonds de sécurité, objectifs, budget mensuel, projection, graphiques.
- Plan 2026-2036 détaillé, trajectoires, onglet Jalons. Compétences 0-5 avec preuve, date, prochaine étape, historique. Portfolio : CV exportable en PDF. Bilan du dimanche pré-rempli depuis les trois applis. Données : historique des exports.
