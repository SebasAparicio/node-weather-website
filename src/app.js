const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sebas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Sebas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is a help page',
        name: 'Sebas'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(address, (error, {location, latitude, longitude} = {})=>{
        if (error){
            return res.send({error})
        }
      
        forecast(latitude,  longitude, (error, forecastData) => {
          if (error){
            return res.send({error})
          }
         res.send({
            location,
            forecast: forecastData,
            address: address
          })
        })
      })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        message: 'Help article not found',
        name: 'Sebas'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        message: 'Page not found',
        name: 'Sebas'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
