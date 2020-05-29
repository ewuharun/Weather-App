console.log("this is js files")



var form = document.querySelector('form')
var search = document.querySelector('input')
var error_message = document.querySelector('#error_message')
var forCastData = document.querySelector('#forCastData')

form.addEventListener(('submit'), (e) => {
    e.preventDefault()

    var address = search.value
    error_message.textContent = "Loading..."
    forCastData.textContent = ""
    if (address == "") {
        error_message.textContent = "You must provide a location"
    } else {

        fetch("http://localhost:3000/weather?address=" + address).then((response) => {
            response.json().then((data) => {
                console.log(data)
                if (data.error) {
                    error_message.textContent = data.error
                } else {
                    forCastData.textContent = "Weather is : " +
                        data.forecast.weather +
                        "(" + data.forecast.description + ")," +
                        " Pressure is : " +
                        data.forecast.pressure + ", Humidity is : " +
                        data.forecast.humidity + ", kelvin temp is: " + data.forecast.kelvin + "k"
                }
            })
        })
    }



})