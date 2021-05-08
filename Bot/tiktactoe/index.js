const Discord = require('discord.js')
const keys = require('./auth.json')
const client = new Discord.Client()

var cMap = new Map()
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
function newGame() {
    return {
        board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        turn: 0,
        O: '',
        X: '',
    }
}
function indexFinder(args) {
    let index = 0
    switch (args[1]) {
        case 'T':
            index = 0
            switch (args[2]) {
                case 'L':
                    index += 0
                    break
                case 'M':
                    index += 1
                    break
                case 'R':
                    index += 2
                    break
            }
            break
        case 'M':
            index = 3
            switch (args[2]) {
                case 'L':
                    index += 0
                    break
                case 'M':
                    index += 1
                    break
                case 'R':
                    index += 2
                    break
            }

            break
        case 'B':
            index = 6
            switch (args[2]) {
                case 'L':
                    index += 0
                    break
                case 'M':
                    index += 1
                    break
                case 'R':
                    index += 2
                    break
            }
            break
    }
    return index
}
function turnOf(game, add) {
    let addR = add
    if (add === undefined) {
        addR = 0
    }

    if ((game.turn + addR) % 2 == 0) {
        return 'O'
    }
    return 'X'
}
function boardGenerator(game) {
    boardA = []

    game.board.forEach((element) => {
        if (element == 0) {
            boardA.push('⬜')
        } else if (element == 1) {
            boardA.push('⭕')
        } else if (element == 2) {
            boardA.push('❌')
        }
    })
    boardString = ''
    boardA.forEach((element, I) => {
        boardString += element
        if ((I + 1) % 3 == 0) {
            boardString += '\n'
        }
    })
    return boardString
}
function boardDraw(game){ 
    state = true
    game.board.forEach((element)=>{
        if (element == 0){
            state = false
        }
    })
    return state
}
function boardWin(game) {
    var gameState = game.board
    let roundWon = false
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i]
        let a = gameState[winCondition[0]]
        let b = gameState[winCondition[1]]
        let c = gameState[winCondition[2]]
        if (a === 0 || b === 0 || c === 0) {
            continue
        }
        if (a === b && b === c) {
            roundWon = true
            break
        }
    }
    return roundWon
}

client.login(keys.token)
client.on('ready', () => {
    console.log('ready')
})

client.on('message', async (message) => {
    if (message.author.bot) {
        return
    }
    if (message.content === '?') {
        message.react('👍')
        message.react('👎')
    }
    if (!message.content.startsWith(keys.prefix)) {
        return
    }

    try {
        var serverID = message.guild.id
    } catch (e) {}

    var args = message.content.split(/ +/)
    var command = args[0].substring(1).toLowerCase()
    var args = message.content.split(' ')
    let Cfilter = (m) => m.author.id === message.mentions.members.first().id
    switch (command) {
        case 'challenge':
            if (message.mentions.members.size < 1) {
                message.channel.send('You must mention a member to challenge')
                break
            }
            if (cMap.has(message.author.id)) {
                message.channel.send("You're already in a game.")
                break
            }
            if (cMap.has(message.mentions.members.first().id)) {
                message.channel.send(
                    `${
                        message.mentions.members.first().user.username
                    } is already in a game.`,
                )
                break
            }
            message.channel.send(
                `${
                    message.mentions.members.first().user.username
                } has been challenged by ${
                    message.author.username
                }. \n\nDo you accept? (y/n)`,
            )
            //challenge(message.mentions.members.first().user.id)
            await message.channel
                .awaitMessages(Cfilter, {
                    max: 1,
                    time: 60000,
                    errors: ['time'],
                })
                .catch(() => {
                    message.channel.send(
                        `${
                            message.mentions.members.first().user.username
                        } has ignored your challenge.`,
                    )
                })
                .then((newM) => {
                    switch (newM.first().content.toLowerCase()) {
                        case 'y':
                        case 'yes':
                        case 'si':
                        case 'ye':
                        case 'yee':
                            message.channel.send(
                                `${
                                    message.mentions.members.first().user
                                        .username
                                } has accepted your challenge. It is now your turn.`,
                            )
                            cMap.set(message.author.id, new newGame())

                            cMap.set(
                                message.mentions.members.first().id,
                                cMap.get(message.author.id),
                            )

                            let current = cMap.get(message.author.id)
                            current.O = message.author.id
                            current.X = message.mentions.members.first().id

                            break
                        default:
                            message.channel.send(
                                `${
                                    message.mentions.members.first().user
                                        .username
                                } has denied your challenge`,
                            )
                    }
                })
            break
        case 'play':
            if (!cMap.has(message.author.id)) {
                message.channel.send("You're not in a game.")
                break
            }
            var playGame = cMap.get(message.author.id)

            if (
                !(
                    (message.author.id == playGame.O &&
                        turnOf(playGame) == 'O') ||
                    (
                        message.author.id == playGame.X &&
                        turnOf(playGame) == 'X'
                    )
                )
            ) {
                message.channel.send("It's not your turn.")
                break
            }
            var vertical = ["M", "B", "T"]
            var horizontal = ["M", "R", "L"]
            if(!vertical.includes(args[1])){
                message.channel.send(args[1] + " is not a valid move, please try [" + vertical + "].")
                break
            }
            if(!horizontal.includes(args[2])){
                message.channel.send(args[2] + " is not a valid move, please try [" + horizontal + "].")
                break
            }
            let move = indexFinder(args)

            //console.log(playGame.board[move])
            if(playGame.board[move] > 0){
                message.channel.send("This space has already been played.")
                break
            }
            if (message.author.id == playGame.O) {
                playGame.board[move] = 1
            } else {
                playGame.board[move] = 2
            }
            //console.log(playGame.board[move])
            playGame.turn++

            message.channel.send(boardGenerator(playGame))
            if (boardWin(playGame)) {
                message.channel.send(`${turnOf(playGame, -1)} has won!`)
                var O = playGame.O
                var X = playGame.X
                cMap.delete(X)
                cMap.delete(O)
            }
            
            if(boardDraw(playGame)){
                message.channel.send("Draw!")
                var O = playGame.O
                var X = playGame.X
                cMap.delete(X)
                cMap.delete(O)
            }
            break
    }
})
