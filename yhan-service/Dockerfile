# Usar una imagen base con Python
FROM python:3.9-slim

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo de la aplicación al contenedor
COPY main.py /app/main.py

# Instalar las dependencias necesarias
RUN pip install --no-cache-dir confluent-kafka

# Comando para ejecutar la aplicación
CMD ["python", "main.py"]