const request = require('postman-request')
const forecast = (lat,long,callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=a4166446dbf6ac6fd1fca7df8aff6966&query=${lat},${long}`
     request ({url, json:true}, (error,{ body })=>{
        if (error){
            callback('Unable to connect to location services',undefined)
        }else if (body.success === false){
            callback('Unable to find location. Try another search',body)
        }else{
            callback(undefined,
             'It is ' +body.current.weather_descriptions[0]+ '. It is currently '+ body.current.temperature + ' degrees outside, but it feels like '+ body.current.feelslike + ' degrees. There is a '+body.current.precip+ '% chance to rain.'
            )
        }
     })
}






 
module.exports = forecast