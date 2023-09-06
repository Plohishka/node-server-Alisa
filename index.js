const express = require('express');
const http = require('http');
const yup = require('yup');
const bodyParser = express.json();
const app = express();
const PORT = 3000;
const server = http.createServer(app);

const USER_SCHEMA = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
    isSubscribed: yup.boolean()
})

const db = [];

app.post('/user', bodyParser, async (req, res, next) => {
    const { body } = req;
    try {
        const result = await USER_SCHEMA.validate(body);
        next();
    } catch (error) {
        res.status(400).send(error.message);
    }
}, (req, res, next) => {
    const {body} = req;
    const user = {...body, id: db.length};
    db.push(user);
    delete user.password;
    res.status(201).send(user);
});


server.listen(PORT, () => {
    console.log(`App is started on port ${PORT}`);
})



