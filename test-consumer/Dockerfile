# Usar una imagen base de Node.js
FROM node:18-slim

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./
COPY consumer.js ./

# Instalar las dependencias de la aplicación
RUN npm install

# Exponer un puerto (si es necesario, aunque kafkajs no escucha puertos directamente)
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["node", "consumer.js"]
