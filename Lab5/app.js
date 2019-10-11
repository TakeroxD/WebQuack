const weather = require('./weather.js')

var city = process.argv.slice(2)
if (city != '')
	city = city.join('%20')
else
	city='Tangamandapio%20Mexico'

weather.getLocation(city,function(err, data){
	if(err){
		console.log('\n\nError intentado obtener localización :(  =>\t'+err)
	} else {
		weather.getWeather(data.center[1],data.center[0],function(error,dato){
			if(error){
				console.log('\n\nError intentando obtener pronóstico :(  =>\t'+error)
			} else {
				console.log('\nPara '+data.place_name+' ('+data.center[1]+','+data.center[0]+')')
				console.log('Hoy se pronostica: '+dato.summary)
				console.log('Las condiciones actuales son:\n'+
					'Temperatura: '+dato.temperature.toFixed(1)+'°C\t'+
					'Humedad: '+(dato.humidity*100).toFixed(0)+'%\t'+
					'Probabilidad de lluvia: '+(dato.precipProbability*100).toFixed(0)+'%\t')
			}
		})
	}
})

