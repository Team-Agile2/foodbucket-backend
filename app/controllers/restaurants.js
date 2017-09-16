'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Restaurants = models.restaurants
const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')
// const yelp = require('yelp-fusion')
// const clientId = 'xlACoXuuSZmb83hJcDxgSg'
// const clientSecret = 'qiH6mwAcjzmzaW1hZ8uvkD9ESq8JWCCUtmBbz3NWs0cbRZRHyFa7J8r0JjT36Gaz'
//
// // gets access token for yelp
// const client = yelp.client(yelp.accessToken(clientId, clientSecret).then(response => {
//   console.log(response.jsonBody.access_token)
// }).catch(e => {
//   console.log(e)
// }))

const _send = require('@tonybadguy/call-me-maybe')

class YelpClient {
  constructor (token) {
    this.token = token
  }

  search (parameters) {
    return _send({
      url: 'https://api.yelp.com/v3/businesses/search',
      query: parameters,
      bearerToken: this.token
    })
  }

  business (id) {
    return _send({
      url: 'https://api.yelp.com/v3/businesses/{id}',
      urlParams: {
        id: id
      },
      bearerToken: this.token
    })
  }
}

const accessToken = (clientId, clientSecret) => {
  return _send({
    url: 'https://api.yelp.com/oauth2/token',
    method: 'post',
    urlencodedBody: {
      grant_type: 'client_credentials',
      client_id: 'xlACoXuuSZmb83hJcDxgSg',
      client_secret: 'qiH6mwAcjzmzaW1hZ8uvkD9ESq8JWCCUtmBbz3NWs0cbRZRHyFa7J8r0JjT36Gaz'
    }
  })
}

const createClient = (token) => {
  return new YelpClient(token)
}

const index = (req, res, next) => {
  Restaurants.find()
    .then(restaurants => res.json({
      restaurants: restaurants.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    restaurants: req.restaurants.toJSON({ virtuals: true, user: req.user })
  })
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.restaurants.update(req.body.restaurants)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.restaurants.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  client: createClient,
  accessToken: accessToken,
  index,
  show,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Restaurants), only: ['show'] },
  { method: setModel(Restaurants, { forUser: true }), only: ['update', 'destroy'] }
] })
