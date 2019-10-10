//
//CIUDAD A BUSCAR
const cityName = 'Morelia'

//Credentials & request init
const credentials = require('./credentials.js')
const request = require('request')

//Methods
//Request Mapbox
const getLocation = function(){
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+cityName+'.json?access_token='+credentials.MAPBOX_TOKEN
	request({url, json: true},function(error, response){
		if(error){
			console.log('Haha NOPE')
		} else {
			const data = response.body.features[0]
			if(data.Response=='False'){
				console.log('Haha still NOPE')
			} else {
				console.log('\nPara '+data.place_name+' ('+data.center[1]+','+data.center[0]+')')
				getWeather(data.center[1],data.center[0])
			}
		}
	})
}

//Request DarkSky
const getWeather = function(latitude,longitude){
	const url = 'https://api.darksky.net/forecast/'+credentials.DARK_SKY_SECRET_KEY+'/'+latitude+','+longitude+
	'?exclude=minutely,daily,alerts,flags&lang=es&units=si'
	request({url, json: true},function(error, response){
		if(error){
			console.log('Haha NOPE')
		} else {
			const data = response.body
			if(data.Response=='False'){
				console.log('Haha still NOPE')
			} else {
				console.log('Hoy se pronostica: '+data.hourly.summary)
				console.log('Las condiciones actuales son:\n'+
					'Temperatura: '+data.currently.temperature.toFixed(1)+'°C\t'+
					'Humedad: '+(data.currently.humidity*100).toFixed(0)+'%\t'+
					'Probabilidad de lluvia: '+(data.currently.precipProbability*100).toFixed(0)+'%\t')
			}
		}
	})
}

//Ejecución
getLocation()