const express = require('express');
const app = express();
var socket = require('socket.io');
const port = 3000;


app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.get('/', (req,res) => {
  res.render('page')
});

app.use(express.static(__dirname + '/public'));


const io =  socket.listen(app.listen(port));

io.sockets.on('connection', (socket) => {

  socket.emit('message', { message: 'welcome to the chat' });
  
  socket.on('send', (data) => {
      io.sockets.emit('message', data);
  });

});

console.log(`Listening on port: ${port}`);