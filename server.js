var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog');		// Connect to the hitList database
mongoose.Promise = Promise;								// Tell mongoose to our ES6 promises

var app = express();
app.use(bodyParser());									// bodyParser will parse POST request body into req.body
app.use(express.static('./public'));					// Serve our static content

app.listen(8090, function() {
	console.log('Listening at http://localhost:8090');
});



var Thread = require('./models/Thread');						// Import our Hit model from models/hit.js

app.get('/threads', function(req,res) {					// Return all the hits in the Hit models (the hits collection)
	Thread.find().sort({date:-1}).exec().then(function(threads) {		// Find a hits, sort by bounty descending, execute, and then...
		res.json(threads);			// Return the hits array
	});
});

app.post('/threads', function(req,res) {			// Anything POSTed to /hits will either be created or updated (depending if _id is defined)
	var thread = req.body;							// Reference req.body as hit for ease
	if(thread._id) {								// If hit._id exists then we know we are updating an existing document
		Thread.findOneAndUpdate({_id:thread._id}, thread).exec().then(function() {	// Find ONE document that matches {_id:hit._id} and set it's properties to the properties in 'hit'
			res.json(true);						// Return something arbitrary to let our client-side know we are done
		});
	} else {									// Else if hit._id is NOT defined...  we are creating a new document
		var newThread = new Thread(thread);				// Create a new document using the Hit model.  We set all of its properties to 'hit' (what was passed from the client)
		newThread.save().then(function() {			// we save newHit and then...
			res.json(true);						// Tell the client-side we are done
		});
	}
});

app.delete('/threads/:id', function(req,res) {
	var id = req.params.id;
	Thread.findOneAndRemove({_id:id}).exec().then(function() {
		res.json(true);
	});
});
