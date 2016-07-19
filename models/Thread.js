var mongoose = require('mongoose');

module.exports = mongoose.model('Post', {                                    // Create a model called Post and export it
	title: String,
	body: String,
	date: Date,
    author: {type:mongoose.Schema.Types.ObjectId, ref:'Author'},   // author is an ObjectId that references the Author model
	comments: [{
    author: String,
    body: String,
    date: Date
	}]
});
