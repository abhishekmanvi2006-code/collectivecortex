const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true }, // e.g., 'Aadhaar', 'Income Certificate'
  file_url: { type: String, required: true },
  extracted_data: { type: Object, default: {} },
  verification_status: { type: String, enum: ['pending', 'verified', 'error'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
