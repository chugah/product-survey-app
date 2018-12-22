const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('./services/passport');
const mongoose = require('mongoose');

// dB Set-up
mongoose.connect('mongodb://localhost:auth/auth', { useNewUrlParser: true });

// App Set-up
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/authRoutes')(app);

// Server Set-up
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT);
console.log('Server listening on:', PORT);
