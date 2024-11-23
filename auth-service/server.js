const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { Kafka } = require('kafkajs');

const app = express();
const port = 8080;

// Kafka configuration
const kafka = new Kafka({
  clientId: 'auth-service',
  brokers: ['kafka:9092'] // Asegúrate de que coincida con la configuración de tu Kafka
});

const producer = kafka.producer();

// Middlewares
app.use(bodyParser.json());

// Simulated user database
const users = {
    'user1': 'password1',
    'user2': 'password2',
  };
// Secret key for JWT
const SECRET_KEY = 'your_secret_key';

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  // Check if user already exists
  if (users[username]) {
    return res.status(400).send('User already exists');
  }

  // Register user
  users[username] = { password }; // Store user with hashed password in a real scenario

  // Produce an event to Kafka topic
  await producer.send({
    topic: 'user_registered',
    messages: [{ value: JSON.stringify({ username }) }],
  });

  res.status(201).send('User registered successfully');
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  // Check if user exists and the password is correct
  const user = users[username];
  console.log(user)
  if (!user || user !== password) {
    return res.status(401).send('Invalid credentials');
  }

  // Generate JWT token
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

  res.status(200).send({ token });
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) return res.status(401).send('Access Denied / Unauthorized request');

  const token = bearerHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

// Protect routes
app.get('/protected', verifyToken, (req, res) => {
  // If token is verified
  res.send(`Hello ${req.user.username}, you have access to protected data.`);
});

// Start Kafka producer
async function start() {
  await producer.connect();
  app.listen(port, () => {
    console.log(`Auth-service running on port ${port}`);
  });
}

start().catch(console.error);
