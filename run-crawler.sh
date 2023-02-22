#!/bin/bash

printf "This script needs sudo, please enter the password\n"
[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"

sudo killall node 2>/dev/null

package='npx'
if [ `npm list -g | grep -c $package` -ne 0 ]; then
    npm install -g $package
fi

function _run_get_urls() {
    printf "\nEnter the site(s) that you want to get the URLs: " 
    read SITE_URLS

    npm install
    npx get-links-urls $SITE_URLS
    killall node
}

function _run_get_urls_without_params(){
    printf "\n Option to add arguments in the script\n"
    printf "\nArguments available\n"
    printf "--output=<string>   File saved to the system\n"
	printf "--max-depth=<number>,   Maximum depth of routes to search"

    printf "\nEnter the site(s) that you want to get the URLs followed by the arguments you want " 
    read SITE_URLS_AND_PARAMS

    npm install
    npx get-links-urls $SITE_URLS_AND_PARAMS
    killall node
}


function _run () {

    export REPOSITORY_PATH

    while true; do
        echo -e "~~~~~~~~~~~~~~~~~~~~~~~~~~~ Run Get-links-URL ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
        echo -e "1  - Get URL without any parameter"
        echo -e "2  - Get URLs by passing the parameters you want"
        echo -e "x  - Exit"
        echo -e "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
        echo -e " 🦖 Choose the operation you want: "
        echo -e "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
        read -a _QUESTION -p "~> "
        echo

        case "${_QUESTION}" in
            1) _run_get_urls ;;
            2) _run_get_urls_without_params ;;
            x)  echo "Bye"; exit 0;;
            *)  echo "Option not found!!"; clear ; _run;;
        esac

    done
}

# Run the main method
_run
