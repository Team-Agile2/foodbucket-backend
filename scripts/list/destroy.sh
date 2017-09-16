#!/bin/bash

API="http://localhost:4741"
URL_PATH="/list"

curl "${API}${URL_PATH}/${RESTAURANTS_ID}" \
  --include \
  --request DELETE \


echo
