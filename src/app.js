const express = require('express')
const path = require('path')
const hbs = require('hbs')


var app = express()
var dirLocation = path.join(__dirname, '../public')
var viewPath = path.join(__dirname, '../templates/views')
var partialPath = path.join(__dirname, '../templates/partial')

app.use(express.static(dirLocation))
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

const geoCode = require('./utils/geoCode')
const foreCast = require('./utils/foreCast')

app.get('', (req, res) => {
    res.render('index', {
        appName: "Weather",
        developedBy: "Md.Harun or rashid"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "this is title",
        body: "this is body",
        developedBy: "Md.Harun or rashid"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "this is title",
        body: "this is body",
        developedBy: "Md.Harun or rashid"
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send("address not found")
    } else {
        geoCode(req.query.address, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            lat = data.lattitude
            lon = data.longitute
            foreCast(lat, lon, (error, weather_data) => {

                if (error) {
                    return res.send("process returned")
                }

                res.send({
                    forecast: weather_data
                })
            })
        })
    }

    //res.render("this is weather page")
})

app.get('*', (req, res) => {
    res.send("My 404 page")
})

app.listen(3000, () => {
    console.log('server is up on port 3000clear')
})