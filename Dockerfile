# Use uma imagem base adequada para sua aplicação (por exemplo, Node.js, Python, etc.)
FROM node:18.17.0

RUN npm install -g pm2
# Crie e defina o diretório de trabalho
WORKDIR /usr/src/app


# Copie os arquivos necessários para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta que sua aplicação estará ouvindo
EXPOSE 3000

# Aguarde o banco de dados antes de iniciar a aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
