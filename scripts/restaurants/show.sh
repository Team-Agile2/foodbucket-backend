#!/bin/sh

API="${API_ORIGIN:-https://api.yelp.com/v3}"
URL_PATH="/businesses/search"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  -H "Authorization: Bearer NHG0larijXXaQKiCWF1D7zz_vpxcnFDPMoIz-i1tRcxdx3Af18IVCYYLXfQGes0o_0R-2TiXKv3qHYs981_sNJiE3yjYZJAkDGEuqNKmzBpZuaxeaBnjF_PtQWC9WXYx" \
  -H "Content-Type: application/json" \
  --data '{
    "search": {
      "term": "restaurants",
      "location": {
      "latitude": "'"${LATITUDE}"'",
      "longitude": "'"${LONGITUDE}"'",
      "radius": "'8000'"
    }
  }
}'

echo
