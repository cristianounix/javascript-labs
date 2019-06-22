const express = require('express')
const webApp = express()
const webServer = require('http').createServer(webApp)
const io = require('socket.io')(webServer)

const game = createGame()

webApp.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html')
})


io.on('connection', function(socket){

  const playerState = game.addPlayer(socket.id)
  socket.emit('bootstrap', game)

  socket.broadcast.emit('player-update', {
    socketId: socket.id,
    newState: playerState
  })

  socket.on('player-move', (direction) => {
    game.movePlayer(socket.id, direction)

    socket.broadcast.emit('player-update', {
      socketId: socket.id,
      newState: game.players[socket.id]
    })

  })

  socket.on('disconnect', () => {
    game.removePlayer(socket.id)
    socket.broadcast.emit('player-remove', socket.id)
  })

});

webServer.listen(3000, function(){
  console.log('> Server listening on port:',3000)
});

function createGame() {
  console.log('> Starting new game')

  const game = {
    canvasWidth: 30,
    canvasHeight: 30,
    players: {},
    addPlayer,
    removePlayer,
    movePlayer
  }

  function addPlayer(socketId) {
    return game.players[socketId] = {
      x: 100,
      y: 100,
    }
  }

  function removePlayer(socketId) {
    delete game.players[socketId]
  }

  function movePlayer(socketId, direction) {
    const player = game.players[socketId]
    player.x = direction.x;
    player.y = direction.y;
    return player
  }
 
  

  return game
}