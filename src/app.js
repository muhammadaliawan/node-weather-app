const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forcast = require('./utils/forcast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlers engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Muhammad Ali Awan'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Muhammad Ali Awan'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'This is some helpful text.',
    name: 'Muhammad Ali Awan',
    helpText: 'Help Message'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please specify the address'
    })
  }

  forcast(req.query.address, (error, data) => {
    if (error) {
      return res.send({error})
    }

    res.send({
      location: data.location,
      forcast: data.result,
      weatherIcon: data.weatherIcon
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    name: 'Muhammad Ali Awan',
    errorMessage: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    name: 'Muhammad Ali Awan',
    errorMessage: 'Page not found.'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})