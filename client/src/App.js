import React, { useState } from 'react';
import axios from 'axios';
import { Sparkles, FileText, Briefcase, Copy, Check } from 'lucide-react';
import { API_ENDPOINTS } from './config';
import './App.css';

function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState('');
  const [optimizedResume, setOptimizedResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-1.5-flash');

  const handleOptimize = async () => {
    if (!jobDescription.trim() || !resume.trim()) {
      setError('Please fill in both job description and resume fields.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(API_ENDPOINTS.optimizeResume, {
        jobDescription,
        resume,
        model: selectedModel
      });

      setOptimizedResume(response.data.optimizedResume);
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to optimize resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(optimizedResume);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const clearAll = () => {
    setJobDescription('');
    setResume('');
    setOptimizedResume('');
    setError('');
    setSuccess('');
    setCopied(false);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>ResumeGPT</h1>
        <p>AI-powered resume optimization for your dream job</p>
      </div>

      <div className="form-container">
        <div className="form-grid">
          <div className="input-group">
            <label>
              <Briefcase size={20} />
              Job Description
            </label>
            <textarea
              className="textarea"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>
              <FileText size={20} />
              Your Current Resume
            </label>
            <textarea
              className="textarea"
              placeholder="Paste your current resume here..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </div>
        </div>

        <div className="action-row">
          <div className="model-selection">
            <label>
              <Sparkles size={16} />
              AI Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="model-select"
              disabled={loading}
            >
              <option value="gemini-1.5-flash">Gemini 1.5 Flash (Fast)</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro (Balanced)</option>
              <option value="gemini-2.0-flash">Gemini 2.0 Flash (Fast)</option>
              <option value="gemini-2.5-pro">Gemini 2.5 Pro (High Quality)</option>
            </select>
          </div>

          <button
            className="button"
            onClick={handleOptimize}
            disabled={loading || !jobDescription.trim() || !resume.trim()}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Optimizing...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Optimize Resume with AI
              </>
            )}
          </button>
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </div>

      {optimizedResume && (
        <div className="result-container">
          <div className="result-header">
            <Sparkles size={24} />
            <h3>Optimized Resume</h3>
          </div>
          <div className="result-content">{optimizedResume}</div>
          <button className="copy-button" onClick={handleCopy}>
            {copied ? (
              <>
                <Check size={16} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy to Clipboard
              </>
            )}
          </button>
        </div>
      )}

      {(jobDescription || resume || optimizedResume) && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            onClick={clearAll}
            style={{
              background: 'transparent',
              color: '#718096',
              border: '1px solid #e2e8f0',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f7fafc';
              e.target.style.color = '#2d3748';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#718096';
            }}
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

export default App; 