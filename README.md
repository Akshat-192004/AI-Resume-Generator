# AI Resume and Cover Letter Generator

A privacy-focused, AI-powered web application to generate professional resumes and cover letters entirely on your local machine. Built with Flask and integrated with Ollama LLM for secure, offline AI processing.

## Features

### Resume Generator
- Four built-in templates: Modern, Classic, Creative, Minimal
- Option to generate 1-page or 2-page resumes
- ATS-optimized and well-formatted for professional applications
- Clickable links for LinkedIn, GitHub, and portfolios
- Progress bar to guide form completion

### Cover Letter Generator
- Job-specific, AI-personalized content
- Proper formatting and persuasive language
- Clickable social and contact links

### Privacy and Offline Support
- No data leaves your device
- Runs fully offline using Ollama LLM
- No API keys or external dependencies

## Prerequisites

- Python 3.8 or higher
- [Ollama](https://ollama.ai) installed and running locally

## Installation

```bash
git clone https://github.com/yourusername/ai-resume-generator.git
cd ai-resume-generator
pip install -r requirements.txt
```
## Start the Ollama server:
```bash
ollama pull llama2:7b
ollama serve
```

## Run the application:
```bash
python app.py
```
Visit http://localhost:5000 in your browser.

## Configuration
Set environment variables in a .env file:
```ini
OLLAMA_URL=http://localhost:11434
MODEL_NAME=llama2:7b
MAX_TOKENS=1500
DEBUG=True
```

Ensure ollama serve is running before using the app

Use ollama pull llama2:7b if model is not installed

Check system resources if performance is slow

Ensure generated_documents/ is writable for downloads




