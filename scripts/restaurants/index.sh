#!/bin/sh

API="https://api.yelp.com/v3"
URL_PATH="/businesses/search"

curl "${API}${URL_PATH}/" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo
