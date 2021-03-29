const passport = require('passport')
var DiscordStrategy = require('passport-discord').Strategy
const OAuth2Strategy = require('passport-oauth2')
const webAuth = require('../private/webAuth.json')

var scopes = ['identify', 'email', 'guilds'];

passport.use(
    'discord',
    new DiscordStrategy(
        {
            clientID: webAuth.clientID,
            clientSecret: webAuth.clientSecret,
            callbackURL: 'http://obsequi.xyz/auth/discord/redirect',
            scope: scopes,
        },
        (accessToken, refreshToken, profile, cb) => {
            console.log(profile)
        },
    ),
)

