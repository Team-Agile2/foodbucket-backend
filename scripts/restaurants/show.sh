#!/bin/sh

curl \
  -X GET \
  -H "Authorization: Bearer NHG0larijXXaQKiCWF1D7zz_vpxcnFDPMoIz-i1tRcxdx3Af18IVCYYLXfQGes0o_0R-2TiXKv3qHYs981_sNJiE3yjYZJAkDGEuqNKmzBpZuaxeaBnjF_PtQWC9WXYx" \
  "https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=41.792875&longitude=-71.414163&radius=8047"

echo
