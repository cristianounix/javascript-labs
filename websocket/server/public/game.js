module.exports = function createGame() {
    const state = {
        players: [],
        screen: {
            width: 400,
            height: 400
        }
    }

    const observers = []

    function start() {
        const frequency = 2000
    }

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of observers) {
            observerFunction(command)
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function addPlayer(command) {
        const playerId = command.playerId
        console.log('playerId --', playerId)
        const x = 'playerX' in command ? command.x : Math.floor(Math.random() * state.screen.width)
        const y = 'playerY' in command ? command.y : Math.floor(Math.random() * state.screen.height)

        state.players[playerId] = {
            x: x,
            y: y
        }

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            x: x,
            y: y
        })
    }

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]

        notifyAll({
            type: 'remove-player',
            playerId: playerId
        })
    }

    function movePlayer(command) {
        notifyAll(command)

        const acceptedMoves = {
            ArrowUp(player) {
                if (player.y - 1 >= 0) {
                    player.y = player.y - 1
                }
            },
            ArrowRight(player) {
                if (player.x + 1 < state.screen.width) {
                    player.x = player.x + 1
                }
            },
            ArrowDown(player) {
                if (player.y + 1 < state.screen.height) {
                    player.y = player.y + 1
                }
            },
            ArrowLeft(player) {
                if (player.x - 1 >= 0) {
                    player.x = player.x - 1
                }
            }
        }

        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[playerId]
        const moveFunction = acceptedMoves[keyPressed]

        if (player && moveFunction) {
            moveFunction(player)
        }

    }


    return {
        addPlayer,
        removePlayer,
        movePlayer,
        state,
        setState,
        subscribe,
        start
    }
}
