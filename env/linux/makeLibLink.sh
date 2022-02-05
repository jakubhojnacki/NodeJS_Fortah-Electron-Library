#!/bin/bash

tty -s || exec konsole -e "$0" "$@"

currentPath=`dirname $0`
linkPath=$currentPath/../../lib
targetPath=$currentPath/../../../../NodeJS

echo "Current path: " $currentPath
echo "Link path: " $linkPath
echo "Target path: " $targetPath

if [ ! -L $linkPath ]; then
    ln -s "$targetPath" "$linkPath"
    echo "Lib link has been created."
else 
    echo "Lib link exists already."
fi    

read -n 1 -s -r -p "(Press any key to end)"
