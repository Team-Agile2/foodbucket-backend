#!/bin/sh

API="https://api.yelp.com/v3"
URL_PATH="/businesses"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer NHG0larijXXaQKiCWF1D7zz_vpxcnFDPMoIz-i1tRcxdx3Af18IVCYYLXfQGes0o_0R-2TiXKv3qHYs981_sNJiE3yjYZJAkDGEuqNKmzBpZuaxeaBnjF_PtQWC9WXYx" \
  --header "Authorization: Token token=$TOKEN"
  --data '{
    "businesses": [
      {
        "open_now": "'"${OPEN_NOW}"'",
        "open_at": "'"${OPEN_AT}"'",
        "location": {
          "zip_code": "'"${ZIP_CODE}"'",
          "latitude": "'"${LATITUDE}"'",
          "longitude": "'"${LONGITUDE}"'",
          "radius": "'"${RADIUS}"'"
        },
      },
    ],
  }'

echo
