@echo off
setlocal

set "PROJECT_DIR=%~dp0src\web-frontend"

if not exist "%PROJECT_DIR%\grit.json" (
  echo [ERROR] Grit project not found: "%PROJECT_DIR%"
  exit /b 1
)

for %%T in (node go pnpm grit) do (
  where.exe %%T >nul 2>&1
  if errorlevel 1 (
    echo [ERROR] Required command "%%T" was not found in PATH.
    echo Install Node.js, Go, pnpm, and the Grit CLI, then try again.
    exit /b 1
  )
)

pushd "%PROJECT_DIR%"
if errorlevel 1 (
  echo [ERROR] Could not enter the Grit project directory.
  exit /b 1
)

if not exist ".env" (
  echo Creating local environment file...
  call grit env
  if errorlevel 1 goto :failed
)

if not exist "node_modules" (
  echo Installing frontend dependencies...
  call pnpm install
  if errorlevel 1 goto :failed
)

echo Starting the LangCompass API and frontend. Press Ctrl+C to stop.
call grit start
set "EXIT_CODE=%ERRORLEVEL%"
popd
exit /b %EXIT_CODE%

:failed
set "EXIT_CODE=%ERRORLEVEL%"
popd
exit /b %EXIT_CODE%
