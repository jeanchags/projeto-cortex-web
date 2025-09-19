# /frontend-react/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# CORREÇÃO: Altera de "npm start" para "npm run dev"
# Inicia o servidor de DESENVOLVIMENTO do Next.js
CMD ["npm", "run", "dev"]
