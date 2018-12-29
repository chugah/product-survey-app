const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

mongoose.set('useCreateIndex', true);

// Define model
const userSchema = new Schema({
  googleId: String,
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// Encrypt password
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if(err) { return next(err); }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) { return callback(err); }
    callback(null, isMatch);
  });
}

// Create model class
const ModelClass = mongoose.model('user', userSchema);

// Export model
module.exports = ModelClass;
