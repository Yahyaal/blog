var mongoose = require('mongoose');

var Post = mongoose.model('Post', {		// Create a new model called Hit
	title: String,
	body: String,
	date: String
});

module.exports = Post;					// Export Hit
