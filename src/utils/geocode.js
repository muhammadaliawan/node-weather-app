const request = require('postman-request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

  request({url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location service!', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined)
    } else {
      callback(undefined, {
        location: body.feature[0].place_name,
        latitude: body.feature[0].center[1],
        longitude: body.feature[0].center[0]
      })
    }
  })
}

module.exports = geocode