#!/bin/bash

set -e

build() {
  echo 'Building Introspect...'

  export INLINE_RUNTIME_CHUNK=false
  export GENERATE_SOURCEMAP=false

  react-scripts build

  mv build/index.html build/popup.html

  zip -r introspect.zip build
}

build
