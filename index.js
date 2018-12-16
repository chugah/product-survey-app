const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('./services/passport');

// App Set-up
const app = express();
require('./routes/authRoutes')(app);

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

// Server Set-up
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT);
console.log('Server listening on:', PORT);
