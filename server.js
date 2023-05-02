const express = require('express');
const favicon = require('serve-favicon');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(favicon(__dirname + '/favicon.ico'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
  console.log('http://localhost:3000');
});
