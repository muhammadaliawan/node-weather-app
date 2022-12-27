const request = require('postman-request')

const forcast = (location, callback) => {
  const url = "http://api.weatherstack.com/current?access_key=6e1e9b2954b1013a030e29dac7f8e627&query=" + location

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!')
    } else if (body.error) {
      callback('Unable to find location. Try another search')
  
    } else {
      const current = body.current
      const data = {
        result: current.weather_descriptions[0] + ". It is currently " + current.temperature + " degrees out. It feels like " + current.feelslike + " degrees out",
        location: body.location.name + ', ' + body.location.region + ', ' + body.location.country,
        weatherIcon: current.weather_icons[0]
      }

      callback(undefined, data)
    }
  })
}

module.exports = forcast