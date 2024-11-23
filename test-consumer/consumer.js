const { Kafka } = require('kafkajs');

// Crear una instancia de Kafka con la configuración adecuada
const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9092'] // reemplaza con la lista de tus brokers de Kafka
});

// Crear un consumidor en el grupo 'test-group'
const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
  // Conectando el consumidor a Kafka
  await consumer.connect();

  // Suscribirse al topic 'test-topic'
  await consumer.subscribe({ topic: 'univalle-ideas', fromBeginning: true });

  // Ciclo para escuchar mensajes
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
        topic,
        partition,
      });
    },
  });
};

run().catch(console.error);

// Para manejar señales de cierre y cerrar el consumidor apropiadamente
process.on('SIGINT', async () => {
  console.log('Cerrando el consumidor...');
  await consumer.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Cerrando el consumidor...');
  await consumer.disconnect();
  process.exit(0);
});
