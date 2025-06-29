const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: {
    name: String,
    arabicName: String,
  },
  prayerNotifications: [{
    prayerName: String,
    enabled: Boolean,
    alarmSound: String,
  }],
  favorites: {
    adkar: [String],
    hadith: [String],
  },
  chatHistory: [{
    message: String,
    response: String,
    timestamp: { type: Date, default: Date.now },
  }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);