const express = require('express');
const path = require('path');
const logger = require('./middleware/logger.js');

//Init express
const app = express();

// init middleware

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({exnteded: false }));

// logs the url and date/time of each get request
// app.use(logger);

//set static folder
app.use( express.static( path.join(__dirname, 'public') ) );

// Members API routes
app.use('/api/members', require('./routes/api/members.js'));

const PORT = process.env.port || 5000;
// tells the server to listen on port either the developer port or OTHER
app.listen(PORT, () => console.log(`server started on port ${PORT}`));