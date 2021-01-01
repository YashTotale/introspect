#!/bin/bash

set -e

printf 'Building Introspect...\n\n'

export INLINE_RUNTIME_CHUNK=false
export GENERATE_SOURCEMAP=false

react-scripts build

cd build

mv index.html popup.html

printf '\nZipping build folder...\n'
web-ext build --overwrite-dest

printf '\nCreating Chrome Directory...\n'
cp -r web-ext-artifacts chrome

printf '\nCreating Firefox Directory...\n'
cp -r web-ext-artifacts firefox

printf '\nCleaning up...\n'
rm -rf web-ext-artifacts
