const request = require('postman-request')
const geocode = (address, callback) =>{
    const url = 'https://api.woosmap.com/address/geocode/json?address='+ encodeURI(address) +'&private_key=0c6fced7-4e4e-44e1-b5f1-3e78dee517b0'

    request({url,json:true}, (error,{ body })=>{
    
       if (error){
        callback('Unable to connect to location services',undefined)
       }else if (body.status === 'REQUEST_DENIED'){
        callback('Please provide proper credentials',undefined)
       }else if (body.status === 'INVALID_REQUEST' || body.status === 'ZERO_RESULTS'){
        callback('Unable to find location. Try another search',undefined)
       }else{
        callback(undefined,{
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng,
          location: body.results[0].formatted_address,
        })
       }
    })
  
  
  }

module.exports = geocode