#!/bin/bash

# API="http://localhost:4741"
API="${API_ORIGIN:-https://foodbucket.herokuapp.com}"
URL_PATH="/restaurants"

curl "${API}${URL_PATH}/${RESTAURANTS_ID}" \
  --include \
  --request DELETE \


echo
