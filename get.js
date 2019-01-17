const express = require('./express');
const app = express();

app.get('/', function(req, res) {
  res.end('hello');
});

app.listen(3000, function() {
  console.log('server start at http://localhost:3000');
});