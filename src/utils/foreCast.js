const request = require('request')

const foreCast = (lattitude, longitude, callback) => {
    var link = "https://api.openweathermap.org/data/2.5/weather?lat=" + lattitude + "&lon=" + longitude + "&appid=d61e02addce9f6d360ddc49916c6585f"
    request({ url: link, json: true }, (error, response) => {
        if (error) {
            callback('unable to find responses', undefined)
        } else if (response.body.error) {
            callback('unable to find data', undefined)
        } else {
            callback(undefined, {
                weather: response.body.weather[0].main,
                description: response.body.weather[0].description,
                pressure: response.body.main.pressure,
                humidity: response.body.main.humidity,
                kelvin: response.body.main.temp

            })
        }

    })

}
module.exports = foreCast