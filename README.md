# ResumeGPT - AI-Powered Resume Optimizer

A modern web application that uses ChatGPT to optimize resumes based on specific job descriptions. The app features a clean, responsive interface with three main text areas: job description input, current resume input, and AI-generated optimized resume output.

## Features

- 🎯 **Job Description Analysis**: Paste any job description to understand requirements
- 📝 **Resume Input**: Upload your current resume for optimization
- 🤖 **AI-Powered Optimization**: Uses Google Gemini to tailor your resume to the job
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 📋 **Copy to Clipboard**: Easy one-click copying of optimized resume
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations

## Tech Stack

- **Frontend**: React.js with modern CSS
- **Backend**: Node.js with Express
- **AI Integration**: Google Gemini 1.5 Flash API
- **Styling**: Custom CSS with responsive design
- **Icons**: Lucide React icons

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resumeGPT
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your Google AI API key:
   ```
   GOOGLE_API_KEY=your_google_api_key_here
   PORT=5000
   ```

5. **Start the development server**
   ```bash
   # Terminal 1: Start backend
   npm run dev
   
   # Terminal 2: Start frontend
   npm run client
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Build

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   cd ..
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## Usage

1. **Paste Job Description**: Copy and paste the job description into the first text area
2. **Paste Your Resume**: Copy and paste your current resume into the second text area
3. **Click Optimize**: Click the "Optimize Resume with AI" button
4. **Review Results**: The AI will generate an optimized version of your resume
5. **Copy Results**: Use the "Copy to Clipboard" button to copy the optimized resume

## API Endpoints

- `POST /api/optimize-resume`
  - Body: `{ jobDescription: string, resume: string }`
  - Returns: `{ optimizedResume: string, message: string }`

## Environment Variables

- `GOOGLE_API_KEY`: Your Google AI API key (required)
- `PORT`: Server port (optional, defaults to 5000)

## Project Structure

```
resumeGPT/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Component styles
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   └── package.json
├── server.js              # Express backend
├── package.json           # Backend dependencies
├── .env                   # Environment variables
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Note**: Make sure you have a valid Google AI API key and sufficient credits in your Google AI account to use the AI features. 