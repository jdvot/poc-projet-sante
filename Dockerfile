FROM node:18-alpine

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm ci

# Copie du code source
COPY . .

# Exposition du port de développement
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "run", "dev"] 