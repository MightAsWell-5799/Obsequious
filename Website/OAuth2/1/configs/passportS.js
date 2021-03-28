const passport = require('passport')
const OAuth2Strategy = require('passport-oauth2')
const webAuth = require('../private/webAuth.json')
const https = require('https')

passport.use(
    'discord',
    new OAuth2Strategy(
        {
            authorizationURL: 'https://discord.com/api/oauth2/authorize	',
            tokenURL: 'https://discord.com/api/oauth2/token',
            clientID: webAuth.clientID,
            clientSecret: webAuth.clientSecret,
            callbackURL: 'http://obsequi.xyz/auth/discord/redirect',
        },
        (AccessToken, refreshToken, profile, done) => {
            
        },
    ),
)
