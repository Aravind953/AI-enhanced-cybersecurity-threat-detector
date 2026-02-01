🛡️ AI-Enhanced Cybersecurity Threat Detection System

📌 Overview

The AI-Enhanced Cybersecurity Threat Detection System is a real-time security monitoring platform designed to detect both known and unknown cyber threats by combining rule-based detection with AI-based anomaly detection. The system analyzes logs in real time, generates intelligent alerts, and streams them instantly to a dashboard, enabling fast and explainable threat response.

This project follows a MERN-style architecture (React, Node.js, Express) with a separate Python AI microservice, making it modular, scalable, and suitable for real-world cybersecurity use cases.

🎯 Problem Statement

Traditional cybersecurity systems rely heavily on static rules, leading to:

High false positives

Poor detection of unknown attacks

Delayed alerts

Limited explainability

There is a need for an adaptive, intelligent, and real-time threat detection system that can identify both known and emerging threats efficiently.

✅ Solution

Our solution uses a hybrid detection approach:

Rule-based logic for known and critical threats

AI-based anomaly detection (Isolation Forest) for unknown or suspicious behavior

Alerts are generated based on a combined risk score and streamed in real time using WebSockets, ensuring fast visibility and explainable decisions.

🏗️ System Architecture
Frontend (React Dashboard)
        ↓
Backend (Node.js + Express)
        ↓
AI Microservice (Python + FastAPI)

🔄 Project Workflow

Logs are generated and sent to the backend

Backend applies rule-based detection

Logs are sent to the AI service for anomaly scoring

Rule score and AI score are combined

Alerts are generated if the threshold is exceeded

Logs and alerts are streamed to the dashboard in real time


🤖 Machine Learning Details

Model Used: Isolation Forest

Type: Unsupervised Anomaly Detection

Why Isolation Forest:

No labeled data required

Effective for detecting rare or unknown patterns

Widely used in cybersecurity


🧱 Tech Stack

🖥️ Frontend

React.js

Vite

JavaScript

Context API

WebSockets

⚙️ Backend

Node.js

Express.js

WebSocket (ws)

REST APIs

File-based persistence (JSON)

🤖 AI / Machine Learning

Python

FastAPI

Scikit-learn

Isolation Forest
🧰 Tools

Git & GitHub

VS Code


🚀 How to Run the Project
Prerequisites

Node.js (v18 or above)

npm

Python (v3.8 or above)

pip


Steps

Clone the repository and move into the project folder
git clone https://github.com/your-username/ai-cyber-threat-detector.git
cd ai-cyber-threat-detector

Start the backend server
cd backend → npm install → npm start
Backend runs on http://localhost:5000

Start the AI / ML service
cd ml-service → pip install -r requirements.txt → uvicorn app:app --port 8000
ML service runs on http://localhost:8000

Start the frontend application
cd frontend → npm install → npm run dev
Frontend runs on http://localhost:5173


🧪 How to Test

Open the frontend dashboard

Go to the Logs page

Click Send Test Log

Navigate to the Alerts page

Observe real-time alert generation with AI scores



🌟 Key Features

Real-time log and alert streaming

Hybrid AI + rule-based detection

Explainable alert scoring

Persistent backend storage

Modular microservice architecture

Zero-cost, local-first deployment


🔮 Future Enhancements

Database integration (MongoDB / PostgreSQL)

Training ML model on real cybersecurity datasets

User authentication and role-based access

Advanced analytics and reporting

Cloud deployment



🏁 Conclusion

This project demonstrates how AI and real-time systems can be combined to build a smart, adaptive, and explainable cybersecurity threat detection platform. The modular design allows easy extension into a full-scale SOC solution.
