const mongoose = require('mongoose');

const stageSchema = new mongoose.Schema({
  title: String,
  date: Date,
  status: { type: String, enum: ['pending', 'completed', 'delayed'], default: 'pending' },
  note: String
});

const applicationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scheme_type: { type: String, required: true },
  status: { type: String, enum: ['draft', 'submitted', 'in_review', 'approved', 'rejected'], default: 'draft' },
  current_stage: { type: Number, default: 0 },
  timeline: [stageSchema],
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
