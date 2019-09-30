window.onload = function () {

  let messages = [];
  const socket = io.connect('http://' + location.host);
  const field = document.getElementById("field");
  const sendButton = document.getElementById("send");
  const content = document.getElementById("content");
  const name = document.getElementById("name");

  socket.on('message', function (data) {
    if (data.message) {
      messages.push(data);
      let html = '';
      for (let i = 0; i < messages.length; i++) {
        html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
        html += messages[i].message + '<br />';
      }
      content.innerHTML = html;
    } else {
      console.log("Error:", data);
    }
  });

  sendButton.onclick = sendMessage = function () {
    if (name.value == "") {
      alert("Please type your name!");
    } else {
      const text = field.value;
      socket.emit('send', { message: text, username: name.value });
      field.value = "";
    }
  };

}

$(document).ready(function () {
  $("#field").keyup(function (e) {
    if (e.keyCode == 13) {
      sendMessage();
    }
  });
});