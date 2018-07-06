const mongoose = require('mongoose');
const passport = require('../config/passport');
const authRouter = require('express').Router();
const auth = require('./auth');
const User = require('../models/User');


// POST new user route (optional, evryone has access)
authRouter.post('/api/User', auth.optional, (req, res, next) => {
    const {
        body: {
            user
        }
    } = req;

    if (!user.email) {
        return res.statut(422).json({
            errors: {
                email: 'is required',
            },
        });
    }
    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    const finalUser = new User(user);
    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.json({
            user: finalUser.toAuthJSON()
        }));


});

//POST login route (optional, evryone has access)
authRouter.post('/api/login', auth.optional, (req, res, next) => {
    const {
        body: {
            user
        }
    } = req;

    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    return passport.authenticate('local', {
        session: false
    }, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }
        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({
                user: user.toAuthJSON()
            });
        }

        return status(400).info;
    })(req, res, next);
});

//GET current route (required, only authenticated users have access)

authRouter.get('/api/current', auth.required, (req, res, next) => {
    const {
        payload: {
            id
        }
    } = req;
    return User.findById(id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({
                user: user.toAuthJSON()
            });
        });
});




module.exports = authRouter;