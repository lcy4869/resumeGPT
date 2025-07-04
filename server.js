const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const path = require('path'); // Added missing import for path

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('client/build'));

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// API endpoint for resume optimization
app.post('/api/optimize-resume', async (req, res) => {
  try {
    const { jobDescription, resume, modelName = 'gemini-1.5-flash' } = req.body;

    if (!jobDescription || !resume) {
      return res.status(400).json({ 
        error: 'Both job description and resume are required' 
      });
    }

    const prompt = `Based on the job description, provide an optimized resume that highlights the candidate's skills and experiences that are relevant to the job description.

Job Description:
${jobDescription}

Current Resume:
${resume}

Please provide the optimized resume in a professional format. Focus on making the candidate's experience relevant to this specific role.`;

    const model = genAI.getGenerativeModel({ model: modelName });
    
    const promptText = `You are an expert resume writer and career coach. Provide clear, professional, and optimized resume content.

${prompt}`;
    
    const result = await model.generateContent(promptText);
    const response = await result.response;
    const optimizedResume = response.text();

    res.json({ 
      optimizedResume,
      message: 'Resume optimized successfully!' 
    });

  } catch (error) {
    console.error('Error optimizing resume:', error);
    res.status(500).json({ 
      error: 'Failed to optimize resume. Please try again.' 
    });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 