const express = require('express');
const favicon = require('serve-favicon');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + 'public'));
app.use(favicon(__dirname + '/favicon.ico'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

