console.log(' May Node be with you ') 

const express		= require('express');
const app 			= express();
const bodyParser 	= require('body-parser');
const MongoClient 	= require('mongodb').MongoClient;

var db

MongoClient.connect('mongodb://yashkmahajan:rajtcool@ds157549.mlab.com:57549/star-wars-quotes',(err,database) =>{
	if(err) return console.log(err)
	db = database
	app.listen(3000,function() {
	// body...
	console.log('listening on 3000')
	})
})

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))


app.get('/',function(req,res){
	//res.send('hello World');
	//res.sendFile(__dirname + '/index.html')
	//	res.render(view,locals)
	
	db.collection('quotes').find().toArray(function(err,result){
		//console.log(result)
		if(err) return console.log(err)
		res.render('index.ejs',{quotes:result})
	
	})

})


app.post('/quotes',(req,res) => {
	db.collection('quotes').save(req.body,(err,result) =>{
		if(err) return console.log(err)

		console.log('saved to database')
		res.redirect('/')
	})
})




