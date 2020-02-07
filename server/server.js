const express = require('express');
const path = require('path');
const members = require('./middleware/members');
const logger = require('./middleware/logger.js');

//Init express
const app = express();

// init middleware

// logs the url and date/time of each get request
// app.use(logger);

// gets all members
app.get('/api/members', (req, res) => {
    res.json(members);
});

// gets single member
app.get('/api/members/:id', (req, res) => {
    // returns true if the member is found in the json data - false if not
    const found = members.some(member => member.id === parseInt(req.params.id));


    // if member is found, send the json - if not, send bad request status and msg
    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id) ));
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});

//set static folder
app.use( express.static( path.join(__dirname, 'public') ) );


const PORT = process.env.port || 5000;
// tells the server to listen on port either the developer port or OTHER
app.listen(PORT, () => console.log(`server started on port ${PORT}`));