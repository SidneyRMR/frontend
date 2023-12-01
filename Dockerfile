# Use a imagem oficial do Node.js como base
FROM node:14

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Comando para criar a build da aplicação React
RUN npm run build

# Exponha a porta do servidor de produção do React
EXPOSE 3000

# Comando para iniciar o servidor de produção
CMD ["npm", "start"]
