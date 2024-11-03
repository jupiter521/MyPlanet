const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
 id:Number,
  name: String,
  company: String,
  registrationDate: { type: Date, default: Date.now },
  plan: { type: String, enum: ['Free', 'Silver', 'Gold'], default: 'Free' },
  avatar: String,
})
const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
