#!/bin/bash

# Stopper et supprimer un conteneur existant
docker kill mon-container-mongodb
docker rm mon-container-mongodb

# Supprimer les données précédentes
rm -rf ./docker_mongo
mkdir docker_mongo
chmod -R 777 docker_mongo

# Télécharger l'image MongoDB
docker pull mongo

# Démarrer MongoDB avec les volumes appropriés
docker run -d -p 27017:27017 --name mon-container-mongodb -v $(pwd)/docker_mongo:/data/db -v $(pwd)/:/app mongo

# Attendre que MongoDB soit prêt
echo "En attente de MongoDB..."

# On augmente ici le délai d'attente à 5 secondes et on améliore les logs
count=0
max_retries=30  # Nombre de tentatives maximum (environ 1 minute de tentatives)

until docker exec mon-container-mongodb mongo --eval "printjson(db.serverStatus())" &>/dev/null; do
  ((count++))
  if [ $count -ge $max_retries ]; then
    echo "MongoDB n'est toujours pas prêt après $max_retries tentatives. Vérification des logs..."
    docker logs mon-container-mongodb  # Afficher les logs de MongoDB pour aider au débogage
    exit 1
  fi
  echo "MongoDB n'est pas encore prêt, tentative $count/$max_retries..."
  sleep 2  # Délai entre les tentatives
done

# Une fois MongoDB prêt, créer la base de données et insérer un document exemple
echo "MongoDB est prêt, création de la base de données et insertion d'exemple..."

docker exec -i mon-container-mongodb mongo <<EOF
use maBaseDeDonnees;  // Remplace par ton nom de base de données
db.cartes.insertOne({
  nomLieu: 'Appartement Test',
  prix: 100000,
  localisation: 'Paris, France',
  imageUrls: [],
  siteUrl: '',
  visite: false,
  note: 4
});
EOF

echo "Base de données et collection créées avec un document d'exemple."
