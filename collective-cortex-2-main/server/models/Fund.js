const mongoose = require('mongoose');

const fundSchema = new mongoose.Schema({
  project_name: { type: String, required: true },
  location: { type: String, required: true },
  sanctioned_amount: { type: Number, required: true },
  used_amount: { type: Number, default: 0 },
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
  risk_score: { type: String, enum: ['low', 'medium', 'high'], default: 'low' }
}, { timestamps: true });

module.exports = mongoose.model('Fund', fundSchema);
