#!/bin/sh

API="http://localhost:4741"
URL_PATH="/list"

curl "${API}${URL_PATH}/${RESTAURANTS_ID}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo
