const express = require('express');
const http = require('http');
const {validateUser} = require('./mw/validations.mw');
const UserController = require('./controllers/User.controller');
const {createUser, getAllUsers, getOneUser, deleteUser, updateUser, loginUser} = UserController;
const bodyParser = express.json();
const app = express();
const {ValidationError} = require('yup');
const PORT = 3000;
const server = http.createServer(app);


app.post('/users', bodyParser, validateUser , createUser);
app.post('/users/:userId', bodyParser, loginUser);
app.get('/users', getAllUsers);
app.get('/users/:userId', getOneUser);
app.delete('/users/:userId', deleteUser);
app.put('/users/:userId',bodyParser, updateUser);

const errorHandler = async (err, req, res, next) => {
    if (err instanceof TypeError) {
        return res.status(400).send('Invalid request');
    }

    if (err instanceof ValidationError) {
        return res.status(401).send(err.message);
    }

    res.status(404).send();
}

app.use(errorHandler);


server.listen(PORT, () => {
    console.log(`App is started on port ${PORT}`);
})



