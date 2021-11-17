/* eslint-disable max-len */
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { UserService } = require('../services')

const { ExtractJwt } = passportJwt
const StrategyJwt = passportJwt.Strategy

passport.use(
    new StrategyJwt({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => UserService.findByQuery({ id: jwtPayload.id }).then((user) => done(null, user)).catch((err) => done(err))),
)
