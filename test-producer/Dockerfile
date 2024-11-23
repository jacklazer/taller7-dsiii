# Usa una imagen base oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./
COPY server.js ./

# Instala las dependencias
RUN npm install

# Expone el puerto que usa tu aplicación
EXPOSE 3000

# Comando para ejecutar tu servidor
CMD ["node", "server.js"]
