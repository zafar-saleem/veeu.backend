const express = require('express');
const Router = express.Router();

Router.get('/', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let date = req.body.date;
    let time = req.body.time;

    let obj = {
        name: name,
        email: email,
        phone: phone,
        date: date,
        time: time
    };

    console.log(obj);
    // res.send('Hello Poster!');
});

module.exports = Router;

