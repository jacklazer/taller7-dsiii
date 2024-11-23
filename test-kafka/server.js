const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'auth-service',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const sendMessage = async () => {
  try {
    await producer.connect();
    await producer.send({
      topic: 'univalle-ideas',
      messages: [
        { value: 'Mensaje de prueba profe Fredy' },
      ],
    });
  } catch (error) {
    console.error('Error al enviar mensaje a Kafka:', error);
  } finally {
    await producer.disconnect();
  }
};

sendMessage().catch(console.error);
