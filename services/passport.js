const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const keys = require('../config/keys');

const localOptions = { usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if(err) { return done(err, false); }
    if(!user) { return done(null, false); }
    user.comparePassword(password, function(err, isMatch) {
      if(err) { return done(err); }
      if(!isMatch) { return done(null, false); }
      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: keys.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if(err) { return done(err, false); }
    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then((existingUser) => {
        if(existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
          .save()
          .then(user => done(null, user));
        }
      })
    }
  )
);

passport.use(new LinkedinStrategy({
  clientID: keys.linkedinClientID,
  clientSecret: keys.linkedinClientSecret,
  callbackURL: '/auth/linkedin/callback'
  }, (accessToken, refreshToken, profile, done) => {
    process.nextTick(function() {
      User.findOne({ linkedId: profile.id }).then((existingUser) => {
        if(existingUser) {
          done(null, existingUser);
        } else {
          var newUser = new User();
          newUser.linkedinId = profile.id;
          done(null, newUser);
        }
      })
    });
  })
);
