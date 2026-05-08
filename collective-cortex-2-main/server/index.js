require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/funds', require('./routes/funds'));

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Collective Cortex API is running' });
});

// AI Chatbot mock endpoint
app.post('/api/chatbot', (req, res) => {
  const { message } = req.body;
  const lowerMsg = message.toLowerCase();
  
  let reply = "I'm sorry, I didn't understand that. You can ask me about 'schemes', 'documents required', or 'application status'.";
  
  if (lowerMsg.includes('status') || lowerMsg.includes('track')) {
    reply = "Your PMAY Housing Scheme application (ID: #APP-8924) is currently at the 'Taluk Office'. There is a 2-day delay. You can view the full timeline on the Tracking page.";
  } else if (lowerMsg.includes('document') || lowerMsg.includes('required')) {
    reply = "For the PMAY Scheme, you need your Aadhaar Card, Income Certificate, and Property Details. Would you like me to take you to the document upload page?";
  } else if (lowerMsg.includes('scheme') || lowerMsg.includes('apply')) {
    reply = "We support PMAY Housing, Land Mutation, Building Approvals, and Hakku Patra. You can start by going to the Schemes section.";
  }

  // Simulate slight AI processing delay
  setTimeout(() => res.json({ reply }), 1000);
});

// Document OCR Verification mock endpoint
app.post('/api/ocr', (req, res) => {
  // Simulating an OCR response after an image upload
  setTimeout(() => {
    res.json({
      status: 'verified',
      extracted_data: {
        name: 'Ramesh Kumar',
        id_number: '1234 5678 9012',
        dob: '01/01/1980'
      },
      message: 'Document verified successfully by AI. Name matches user profile.'
    });
  }, 1500);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
