#!/bin/bash

tty -s || exec konsole -e "$0" "$@"

currentPath=`dirname $0`
linksPath=$currentPath/../../node_modules

echo "Current path: " $currentPath
echo "Links path: " $linksPath

function createLink {
	if [ ! -L $linksPath/$1 ]
	then
		npm link $1
		echo "Link to $1 created"
	else
		echo "Link to $1 exists already"
	fi
}

createLink "electron"

read -n 1 -s -r -p "(Press any key to end)"
