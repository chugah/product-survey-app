const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const keys = require('./config/keys');
require('./services/passport');


// dB Set-up
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// App Set-up
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// Server Set-up
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT);
console.log('Server listening on:', PORT);
