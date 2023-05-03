const express = require('express');
const favicon = require('serve-favicon');
require('dotenv').config();
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/favicon.ico'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to send API key to client
app.get('/api-key', (req, res) => {
  res.send(process.env.API_KEY);
});

// Endpoint to send Client ID to client
app.get('/client-id', (req, res) => {
  res.send(process.env.CLIENT_ID);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  console.log("http://localhost:3000/")
});

