@echo off
title AyurGuru - Full-Stack Local Launcher
echo ============================================================
echo   AyurGuru - AI Ayurveda IPR & Regulatory Assistant
echo   Smart India Hackathon 2024 Solution
echo ============================================================
echo.

:: Start FastAPI Backend in background
echo [1/2] Starting FastAPI Backend on http://127.0.0.1:8000 ...
start "AyurGuru Backend" cmd /k "cd backend && venv\Scripts\activate && python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

:: Start Next.js Frontend
echo [2/2] Starting Next.js Frontend on http://localhost:3000 ...
start "AyurGuru Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are launching!
echo  - Frontend Web App: http://localhost:3000
echo  - Backend API Docs: http://127.0.0.1:8000/docs
echo.
echo Press any key to exit this launcher window...
pause >nul
