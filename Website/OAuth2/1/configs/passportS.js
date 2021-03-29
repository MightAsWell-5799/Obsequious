const passport = require('passport')
var DiscordStrategy = require('passport-discord').Strategy
const OAuth2Strategy = require('passport-oauth2')
const webAuth = require('../private/webAuth.json')
const User = require('../configs/userSchema')

var scopes = ['identify', 'email', 'guilds']

passport.use(
    'discord',
    new DiscordStrategy(
        {
            clientID: webAuth.clientID,
            clientSecret: webAuth.clientSecret,
            callbackURL: 'http://obsequi.xyz/auth/discord/redirect',
            scope: scopes,
        },
        async (accessToken, refreshToken, profile, cb) => {
            //console.log(profile)
            var user = new User({
                DisplayName: profile.displayName,
                ID: profile.id,
                Avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
            })

            user = await user.save()
            console.log(user.DisplayName)
        },
    ),
)
