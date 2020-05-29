const request = require('request')
const geoCode = (address, callback) => {
    const link1 = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?types=address&proximity=-122.39738575285674,37.792514711136945&access_token=pk.eyJ1IjoiaGFydW5rODczIiwiYSI6ImNrYXB0MXN0aDAyc28yenMwbWlpMTAzYjQifQ.SWdzcAEqoNYX_x4dXYD2Ig"
    request({ url: link1, json: true }, (error, response) => {
        if (error) {
            callback('unable to find the location', undefined)
        } else if (response.body.features.length == 0) {
            callback('unable to find features', undefined)
        } else {
            callback(undefined, {
                lattitude: response.body.features[0].center[1],
                longitute: response.body.features[0].center[0],
                place: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode