#!/bin/bash

GREEN='\e[92m'
NC='\033[0m'

lint() {
  eslinter
  printf "\n"
  markdownlinter
  printf "\n"
  prettierlinter
}

eslinter() {
  printf "Linting with ESLint...\n\n"

  eslint --fix .

  printf "${GREEN}ESLint Done${NC}\n"
}

markdownlinter() {
  printf 'Linting with MarkdownLint...\n\n'

  markdownlint --fix .

  printf "${GREEN}MarkdownLint Done${NC}\n"
}

prettierlinter() {
  printf 'Linting with Prettier...\n\n'

  prettier --write . >/dev/null

  printf "${GREEN}Prettier Done${NC}\n"
}

lint
