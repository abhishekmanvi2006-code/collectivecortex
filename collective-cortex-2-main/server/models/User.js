const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: false },
  language: { type: String, default: 'English' },
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
