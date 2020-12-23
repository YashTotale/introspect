#!/bin/bash

build() {
  echo 'Building Introspect...'

  export INLINE_RUNTIME_CHUNK=false
  export GENERATE_SOURCEMAP=false

  react-scripts build

  mv build/index.html build/popup.html
}

build
