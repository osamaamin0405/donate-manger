@echo off
SET mypath=%~dp0
echo %mypath:~0,-1%
%mypath:~0,1%:
cd %mypath%
node index.js