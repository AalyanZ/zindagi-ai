const express = require('express');
const cors = require('cors');
require('./db/config');
const Email = require('./db/email');
const Contact = require('./db/contact');
const Review = require('./db/review');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/add-email', async (req, res) => {
    let email = new Email(req.body);
    let result = await email.save();
    res.send(result);
})


app.post('/add-contact', async (req, res) => {
    let contact = new Contact(req.body);
    let result = await contact.save();
    res.send(result);
})

app.post('/add-review', async (req, res) => {
    let review = new Review(req.body);
    let result = await review.save();
    res.send(result);
})

app.listen(5000, () => {
    console.log('Server is running');
});

