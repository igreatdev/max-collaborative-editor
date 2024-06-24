#!/bin/bash

function outputNext(){
    echo ""
    echo "--- Next: $1 ---"
    # echo ""
}

# Install dependencies
outputNext "Running yarn install"
yarn --production

# Run migrations
outputNext "Running migrations"
yarn run migrate:up

echo ""
echo "----* Done *----"
