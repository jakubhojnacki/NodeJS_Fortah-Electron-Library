@echo off

set currentPath=%~dp0
set linkPath=%currentPath%..\..\lib
set targetPath=%currentPath%..\..\..\..\NodeJS

mklink /D "%linkPath%" "%targetPath%"

pause