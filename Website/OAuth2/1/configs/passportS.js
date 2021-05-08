const passport = require('passport')
var DiscordStrategy = require('passport-discord').Strategy
const webAuth = require('../private/webAuth.json')

const User = require('../configs/userSchema')

//the information that is retrieved from the user
var scopes = ['identify', 'email', 'guilds']

//generates the discord passport strategy
passport.use(
    'discord',
    new DiscordStrategy(
        {
            //from webAuth
            clientID: webAuth.clientID,
            clientSecret: webAuth.clientSecret,
            //page that is rendered after authentication
            callbackURL: 'http://obsequi.xyz/auth/discord/redirect',
            //scopes defined above
            scope: scopes,
        },
        async (accessToken, refreshToken, profile, cb) => {
            //save user with the mongoose User Object form

                
            var user = new User({
                ID: profile.id,
                name: profile.username,
                avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
            })

            user = await user.save()
            console.log(user.name)
        },
    ),
)
