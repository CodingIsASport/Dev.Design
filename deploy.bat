@echo off
title Deploy to GitHub
color 0b

echo ===================================================
echo        Automatic GitHub Deployment Script
echo ===================================================
echo.

cd /d "%~dp0"


:: Check if git is initialized
if not exist .git (
    echo [ERROR] Git is not initialized in this directory.
    echo Please run 'git init' and set up your remote repository first.
    pause
    exit /b
)

:: Add all changes
echo [1/3] Adding changes to staging...
git add .

:: Commit changes
echo.
setlocal EnableDelayedExpansion
set commitMsg=
set /p "commitMsg=[2/3] Enter commit message (Press Enter for 'Update portfolio'): "
if "!commitMsg!"=="" set "commitMsg=Update portfolio"

git commit -m "!commitMsg!"
endlocal

:: Push changes
echo.
echo [3/3] Pushing to GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed. Make sure you have set a remote origin:
    echo git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
) else (
    echo.
    echo [SUCCESS] Deployed successfully!
)

pause
