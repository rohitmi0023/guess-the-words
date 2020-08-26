const express = require('express');
const path = require('path');

const connectDB = require('./config/db');

const app = express();

//Connecting to database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

//App routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/results', require('./routes/api/results'));

//Serve static assests if in production
if (process.env.NODE_ENV === 'production') {
	//Set static folder
	app.use(express.static(path.join(__dirname, 'client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.get('/', (req, res) => res.send(`API started..`));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Express surver is up and running!`));
