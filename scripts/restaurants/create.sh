#!/bin/bash

# API="http://localhost:4741"
API="${API_ORIGIN:-https://foodbucket.herokuapp.com}"
URL_PATH="/restaurants"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "businesses": {
      "restaurants": "'"${RESTAURANTS_ID}"'"
    }
  }'

echo
