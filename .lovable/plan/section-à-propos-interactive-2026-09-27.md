# Section « À propos » interactive

## À construire
- Ajouter la section « À propos » entre « créations » et « contacte ».
- Recomposer uniquement les six éléments demandés du CV : présentation, note, compétences, parcours, portrait scotché et post-it jaune.
- Reprendre le langage visuel du CV : fenêtres claires, barre supérieure avec points rouge et gris, coins arrondis et ombre légère.
- Exclure la photo avec le chat et tous les accessoires décoratifs de fond.

## Interactions
- Rendre chaque bloc déplaçable à la souris et au toucher, sans pouvoir sortir de la section.
- Mettre le bloc actif au premier plan, l’agrandir légèrement pendant le déplacement, puis conserver sa nouvelle position au relâchement.
- Ajouter un léger agrandissement au survol et des transitions douces.
- Sur petit écran, conserver une composition lisible avec des positions adaptées et des déplacements limités à la zone visible.

## Détails techniques
- Créer un composant dédié pour isoler la gestion du glisser-déposer et des positions.
- Extraire le portrait fourni dans le CV et l’intégrer comme image locale au projet.
- Utiliser les couleurs du CV via des variables dédiées dans le système visuel existant.
- Relier le bouton « à propos » de la première section à cette nouvelle section, tout en gardant la fenêtre existante disponible seulement si nécessaire.
- Vérifier l’affichage, le chevauchement et le déplacement sur ordinateur et mobile.
