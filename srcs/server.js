const fetch = require('fetch').fetchUrl
const express = require('express')
const app = express()
require('dotenv').config()
const port = 3000
let token
let acs_token
let next

app.get('/', async(req, res) =>{
	res.redirect('https://api.intra.42.fr/oauth/authorize?client_id=' + process.env. CLIENT_ID + '&redirect_uri=http%3A%2F%2F' + process.env.IP + '%3A3000%2Findex&response_type=code')
})

app.get('/static/me', async(req, res) =>{
	var myheaders =  {"Authorization": "Bearer " + token};
	const options = {
		method: 'GET',
		headers: myheaders,
		mode: 'cors',
		cache: 'default'
	}
	const response = await fetch("https://api.intra.42.fr/v2/me", options, (error, meta, body)=>{
		const data = JSON.parse(body.toString())
		console.log(data)
		res.render(__dirname + '/public/static/me.ejs', {me: data, req_ret:''})
	})
})

app.get('/static/next', async(req, res) =>{
	var myheaders =  {"Authorization": "Bearer " + token};
	const options = {
		method: 'GET',
		headers: myheaders,
		mode: 'cors',
		cache: 'default'
	}
	const response = await fetch(next, options, (error, meta, body)=>{
		const data = JSON.parse(body.toString())
		next = meta.responseHeaders.link
		console.log(data)
		let next_index = next.lastIndexOf("https:")
		let last = next.lastIndexOf(">")
		next = next.substring(next_index, last);
		console.log(next)
		console.log(next_index)
		res.render(__dirname + '/public/static/events.ejs', {events: data, req_ret:''})
	})
})

app.get('/static/events', async(req, res) =>{
	var myheaders =  {"Authorization": "Bearer " + token};
	const options = {
		method: 'GET',
		headers: myheaders,
		mode: 'cors',
		cache: 'default'
	}
	const response = await fetch("https://api.intra.42.fr/v2/campus/22/events", options, (error, meta, body)=>{
		const data = JSON.parse(body.toString())
		next = meta.responseHeaders.link
		console.log(data)
		let next_index = next.lastIndexOf("https:")
		let last = next.lastIndexOf(">")
		next = next.substring(next_index, last);
		console.log(next)
		console.log(next_index)
		res.render(__dirname + '/public/static/events.ejs', {events: data, req_ret:''})
	})
})

app.get('/index?*', async(req, res) =>{
	const url = req.url
	let index = url.indexOf("?")
	acs_token = req.url.substring(index + 6, url.length)
	console.log('First access_code ->' + acs_token)
	let options
	await fetch("http://" + process.env.IP + ":3000/app/token", options, async (error, meta, body)=>{
		const data = await JSON.parse(body.toString())
		token = data.access_token
		console.log("Final token-> " + token)
		console.log('DATOS')
		console.log(data)
	})
	res.sendFile(__dirname + '/public/index.html')
	app.use(express.static('public'))
})

app.get('/app/token', async(req, res) =>{
	const data = 'grant_type=authorization_code&code=' + acs_token + '&redirect_uri=http://' + process.env.IP + ':3000/index&client_id=' + process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET
	const options = {
		method:'POST',
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		payload:data
	}
	const response = fetch(process.env.URL, options, async (error, meta, body)=>{
		const data = JSON.parse(body)
		token = await data.access_token
		return await res.json(data)
	})
})


app.get('/app/call', async(req, res) =>{
	const url = req.url
	console.log('the token to the call is -> ' + token)
	let index = url.indexOf("?");
	link = req.url.substring(index + 1, url.length);
	var myheaders =  {"Authorization": "Bearer " + token};
	const options = {
		method: 'GET',
		headers: myheaders,
		mode: 'cors',
		cache: 'default'
		}
	const response = await fetch("https://api.intra.42.fr" + link , options, (error, meta, body)=>{
		const data = JSON.parse(body.toString())
		console.log(data)
		console.log(meta)
		return res.json({data})
		})
})


app.listen(port, () =>{
	console.log(`Server listening at http://${process.env.IP}:${port}`)
})
