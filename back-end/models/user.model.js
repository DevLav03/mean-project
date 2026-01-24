const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
//   _id: ObjectId,
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  isActive: { type: Boolean, default: true },
   createdAt: { type: Date, default: Date.now },
}, {
  collection: 'users', versionKey: false
});

module.exports = mongoose.model('User', userSchema);
