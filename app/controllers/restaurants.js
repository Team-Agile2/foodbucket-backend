'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Restaurants = models.restaurants
const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')
const yelp = require('yelp-fusion')
const clientId = 'xlACoXuuSZmb83hJcDxgSg'
const clientSecret = 'qiH6mwAcjzmzaW1hZ8uvkD9ESq8JWCCUtmBbz3NWs0cbRZRHyFa7J8r0JjT36Gaz'

// gets access token for yelp

yelp.accessToken(clientId, clientSecret).then(response => {
  const client = yelp.client(response.jsonBody.access_token)

  client.search({
    term: 'restaurants',
    location: 'providence, ri'
  }).then(response => {
    console.log(response.jsonBody.businesses[0].name)
  })
}).catch(e => {
  console.log(e)
})

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

const create = (req, res, next) => {
  const restaurants = Object.assign(req.body.restaurants, {
    _owner: req.user._id
  })
  Restaurants.create(restaurants)
    .then(restaurants =>
      res.status(201)
        .json({
          restaurants: restaurants.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  update,
  destroy,
  create
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Restaurants), only: ['show'] },
  { method: setModel(Restaurants, { forUser: true }), only: ['update', 'destroy'] }
] })
