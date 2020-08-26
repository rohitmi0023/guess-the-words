const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultsSchema = new Schema({
	results: [String],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

module.exports = Results = mongoose.model('Results', ResultsSchema);
