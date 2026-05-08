const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Fund', required: true },
  amount: { type: Number, required: true },
  vendor: { type: String, required: true },
  date: { type: Date, required: true },
  bill_image: { type: String },
  extracted_data: { type: Object, default: {} },
  risk_level: { type: String, enum: ['low', 'medium', 'high'], default: 'low' }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
