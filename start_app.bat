@echo off
title DyslexiaQuest Local Server
echo ===================================================
echo   DyslexiaQuest - The Lost Canopy of Lexis
echo ===================================================
echo.
echo Checking Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not found on your system!
    echo Please download and install Node.js from https://nodejs.org/ (choose LTS)
    echo Then run this file again.
    echo.
    pause
    exit /b 1
)

echo Node.js is installed.
echo.
if not exist node_modules (
    echo First time setup: Installing dependencies...
    echo This may take 1-2 minutes. Please wait...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] npm install failed. Please check your internet connection.
        pause
        exit /b 1
    )
)

echo.
echo Starting local development server...
echo ---------------------------------------------------
echo Once started, click or copy the localhost URL into your browser!
echo ---------------------------------------------------
echo.
call npm run dev -- --open
pause
