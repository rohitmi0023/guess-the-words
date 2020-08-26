const express = require('express');
const auth = require('../../middleware/auth');
const Results = require('../../models/Results');

const router = express.Router();

router.post('/', [auth], async (req, res) => {
	try {
		let results = await Results.findOne({ user: req.user.id });
		results = await Results.findOneAndUpdate(
			{
				user: req.user.id,
			},
			{ $push: { results: req.body.result } },
			{ new: true, safe: true, upsert: true }
		);
		return res.json(results);
	} catch (err) {
		console.log(err.message);
	}
});

router.get('/', [auth], async (req, res) => {
	try {
		let results = await Results.findOne({ user: req.user.id });
		return res.json(results.results);
	} catch (err) {
		console.log(err.message);
	}
});

module.exports = router;
