const User = require('../models/User');


module.exports.createUser = async (req, res, next) => {
    try {
        const { body } = req;
        const createdUser = await new User(body);
        const result = await createdUser.save();
        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (error) {
        next(error);
    }
}

module.exports.getOneUser = async (req, res, next) => {
    try {
        const { params: { userId } } = req;
        const foundedUser = await User.findOne(Number(userId));
        res.send(foundedUser);
    } catch (error) {
        next(error);
    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const { params: { userId } } = req;
        const foundedUser = await User.findOne(Number(userId));
        const result = await foundedUser.delete();
        res.status(200).send('User deleted');
    } catch (error) {
        next(error);
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const { body, params: { userId } } = req;
        const foundedUser = await User.findOne(Number(userId));
        const result = await foundedUser.update(body);
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}

module.exports.loginUser = async (req, res, next) => {
    try {
        const { body, params: { userId } } = req;
        const foundedUser = await User.findOne(Number(userId));
        if (foundedUser.email === body.email) {
            if (foundedUser.password === body.password) {
                res.status(202).send('Authorized succesfull');
            } else {
                res.status(401).send('Password incorrect');
            }
        } else {
            res.status(403).send('Incorrect data');
        }
    } catch (error) {
        next(error);
    }
}