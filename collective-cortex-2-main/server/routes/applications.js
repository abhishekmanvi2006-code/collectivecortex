const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// Middleware mock (replace with actual JWT middleware)
const protect = (req, res, next) => {
  // Mocking user ID for now
  req.user = { _id: 'mock_user_id' }; 
  next();
};

// @route   GET /api/applications
// @desc    Get all applications for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    // In actual implementation: const apps = await Application.find({ user_id: req.user._id });
    const apps = await Application.find();
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/applications
// @desc    Create a new application
router.post('/', protect, async (req, res) => {
  try {
    const { scheme_type } = req.body;
    
    // In actual implementation, replace req.body.user_id with req.user._id
    const newApp = await Application.create({
      user_id: req.body.user_id, // temporarily expecting it in body
      scheme_type,
      status: 'submitted',
      timeline: [
        { title: 'Application Submitted', date: new Date(), status: 'completed', note: 'System received application' }
      ]
    });

    res.status(201).json(newApp);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/applications/:id
// @desc    Get application by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found' });
    res.json(app);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
