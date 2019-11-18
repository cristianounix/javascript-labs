const express = require('express')
const webApp = express()
const webServer = require('http').createServer(webApp)
const io = require('socket.io')(webServer)

const editor = createEditor()

webApp.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html')
})


io.on('connection', function(socket){

  const editorState = editor.addEditor(socket.id)
  socket.emit('bootstrap', editor)

  socket.broadcast.emit('player-update', {
    ...editorState
  })

  socket.on('player-move', (direction) => {
    editor.moveEditor(socket.id, direction)

    socket.broadcast.emit('player-update', {
      id: socket.id,
      ...editor.persons[socket.id]
    })

  })

  socket.on('disconnect', () => {
    editor.removeEditor(socket.id);
    socket.broadcast.emit('player-remove', socket.id);
  })

});

webServer.listen(3001, function(){
  console.log('> Server listening on port:',3001)
});

function createEditor() {

  const editor = {
    persons: {},
    addEditor,
    removeEditor,
    moveEditor
  }

  function addEditor(socketId) {
    return editor.persons[socketId] = {
      id: socketId,
      text: '',
      keyPressed: null,
    }
  }

  function removeEditor(socketId) {
    delete editor.persons[socketId]
  }

  function moveEditor(socketId, direction) {
    const person = editor.persons[socketId]
    person.text = direction.text;
    person.keyPressed = direction.keyPressed;
    return person
  }

  return editor
}