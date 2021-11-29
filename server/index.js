const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 5000;
const Moment = require('moment');
require('moment-timezone');
const prospectRoutes = express.Router();

let Prospect = require('./models/prospects');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


mongoose.connect('mongodb+srv://btech:BTDeIOBK1hmU4OCW@biorev.fz2ym.mongodb.net/thbs2021?retryWrites=true', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

prospectRoutes.route('/').get(function(req, res) {
    Prospect.find(function(err, prospects) {
        if (err) {
            console.log(err);
        } else {
            res.json(prospects);
        }
    });
});

prospectRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Prospect.findById(id, function(err, prospect) {
        res.json(prospect);
    });
});

prospectRoutes.route('/:id').patch(function(req, res) {
    Prospect.findById(req.params.id, function(err, prospect) {
        if (!prospect)
            res.status(404).send("data is not found");
        else
            prospect.first_name = req.body.first_name;
            prospect.last_name = req.body.last_name;
            prospect.company = req.body.company;
            prospect.email = req.body.email;
            prospect.mobile = req.body.mobile;
            prospect.segment = req.body.segment;
            prospect.products = req.body.products;
            prospect.contact_after = req.body.contact_after;
            prospect.contact_mode = req.body.contact_mode;
            prospect.agent_comment = req.body.agent_comment;
            prospect.comments = req.body.comments;
            prospect.date = req.body.date;
            prospect.other_service = req.body.other_service;
            prospect.tags = req.body.tags;
            prospect.other_mode = req.body.other_mode;
            prospect.actual_date = Moment(new Date()).tz('America/Phoenix');

            prospect.save().then(prospect => {
                res.json('Prospect updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

prospectRoutes.route('/').post(function(req, res) {
    let prospect = new Prospect(req.body);
    prospect.save()
        .then(prospect => {
            res.status(200).json({'prospect': 'prospect added successfully'});
        })
        .catch(err => {
            console.log(err);
            res.status(400).send('adding new prospect failed');
        });
});

app.use('/posts', prospectRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});