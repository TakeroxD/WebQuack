//Credentials & request init
const credentials = require('./credentials.js')
const request = require('request')

//Methods
//Request Mapbox
const getLocation = function(cityName,callback){
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+cityName+'.json?access_token='+credentials.MAPBOX_TOKEN
	request({url, json: true},function(error, response){
		if(error){
			callback(error, undefined)
		} else {
			const data = response.body
			if(data.message){
				callback(data.message,undefined)
			} else if(data.features[0]==undefined){
				callback(data.query+' was not found',undefined)
			} else {
				const info = {
					place_name: data.features[0].place_name,
					center: data.features[0].center 
				}
				callback(undefined, info)
			}
		}
	})
}

//Request DarkSky
const getWeather = function(latitude,longitude,callback){
	const url = 'https://api.darksky.net/forecast/'+credentials.DARK_SKY_SECRET_KEY+'/'+latitude+','+longitude+
	'?exclude=minutely,daily,alerts,flags&lang=es&units=si'
	request({url, json: true},function(error, response){
		if(error){
			callback(error,undefined)
		} else {
			const data = response.body
			if(data.code){
				callback(data.code+' - '+data.error,undefined)
			} else {
				const info = {
					summary: data.hourly.summary,
					temperature: data.currently.temperature,
					humidity: data.currently.humidity,
					precipProbability: data.currently.precipProbability
				}
				callback(undefined, info)
			}
		}
	})
}

//Export
module.exports = {
	getLocation: getLocation,
	getWeather: getWeather
}