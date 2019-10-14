const express = require('express')
const omdb = require('./movies.js')

const app = express()

const port = process.env.PORT || 3000

app.get('',function(req,res){
	res.send({
		greeting: 'Hola mundo!'
	})
})

app.get('/omdb',function(req,res){
	if(!req.query.search){
		res.send({error: 'Necesitamos mas gas vespeno'})
	}
	omdb.omdbSeries(req.query.search,function(error,response){
		if (error){
			res.send({error: error})
		}
		if(response.seasons){
			var title = response.title
			var plot = response.plot
			omdb.omdbSeason(response.title, response.seasons, function(error, response){
				if (error) {
					return res.send({error: error})
				}
				res.send({
					title: title,
					plot: plot,
					season: response.season,
					episodes: response.episodes
				})
			})
		} else {
			res.send({response})
		}
	})	
})

app.get('*',function(req,res){
	res.send({
		greeting: 'Ruta invalida'
	})
})

app.listen(port,function(){
	console.log('Up up up baby!')
})

