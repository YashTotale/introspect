#!/bin/bash

set -e

build() {
  printf 'Building Introspect...\n\n'

  export INLINE_RUNTIME_CHUNK=false
  export GENERATE_SOURCEMAP=false

  react-scripts build

  mv build/index.html build/popup.html

  printf 'Zipping Build Folder...\n'
  zip -r introspect.zip build
}

build
