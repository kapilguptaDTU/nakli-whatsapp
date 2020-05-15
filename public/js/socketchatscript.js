const socket = io()
const messageContainer = document.getElementById('message-container')


// const mainmessageContainer = document.getElementById('scroller')
const mainmessageContainer = document.getElementById('mainscroller')

const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const anchor = document.getElementById('anchor')
const width100 = document.getElementById('width100')
const status = document.getElementById('online-status')








// socket.emit('room-created');

// if (anchor != null) {


//   submitter.addEventListener('submit', e => {
//     e.preventDefault()
//     const message = messageInput.value
//     appendMessage(`You: ${message}`)
//     socket.emit('send-chat-message', roomName, message)
//     messageInput.value = ''
//   })

// }


if (messageForm != null) {
  // const name = prompt('What is your name?')
  // appender('You joined')
  socket.emit('user-opened-chat', rec, sen);
  // socket.emit('new-user','hi')

  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    // appender(`You: ${message}`)
    mainappender(message,'sender');
    // console.log(reccomp);
    console.log("main senderaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+sen);
    console.log("main recieveraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+rec);

    socket.emit('send-chat-message', rec, sen, message)
    messageInput.value = ''
  })
}
socket.on('reciever-joined-message', () => {

  status.innerText='online';
  // appender('reciever has joined');

})




socket.on('room-created', room => {
  const roomElement = document.createElement('div')
  roomElement.innerText = room
  const roomLink = document.createElement('a')
  roomLink.href = `/${room}`
  roomLink.innerText = 'join'
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)
})

socket.on('chat-message', data => {
  // appender(`${data.sen}: ${data.message}`)
  mainappender(data.message,'reciever')
})
socket.on('chat-message-wale', data => {
  // appender(`${data.sen}: ${data.message}`)
  console.log("reciever"+data.recieverName);
  console.log("sender"+data.senderName);
  
})

socket.on('user-connected', name => {
  // appender(`${name} connected`)
})

socket.on('user-disconnected', name => {
  // appender(`${name} disconnected`)
const width100 = document.getElementById('width100')
if(status)status.innerText='ofline';


})

function appender(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText =  message
  width100.append(messageElement)
}

function mainappender(message,who) {
  const me = document.createElement('div')
// console.log('inside main appender'+message+who);
  me.classList.add("container-login100-form-btn");
  me.classList.add("p-t-10");
  // me.classList.add("w100");
  
if(who=='sender')
{me.classList.add("flr");
// console.log('who is sender')
}
else{
me.classList.add("fll");
// console.log('who is reciever')
}
const anc = document.createElement('a')
anc.classList.add("login100-form-btn");
if(who=='sender')
anc.classList.add("back-for-float-right");
else
anc.classList.add("back-for-float-left");
if(who=='sender'){
  anc.innerText=senname+':'+message
}
  else
  {
    anc.innerText=recname+':'+message
  }

me.appendChild(anc);
mainmessageContainer.appendChild(me);  
  // messageElement.innerText = message
  // width100.append(messageElement)
}







// <div class="w100">
//                                     <div class="container-login100-form-btn p-t-10 flr" style="font-family: 'Montserrat Alternates', sans-serif; float:right;">
//                                             <a class="login100-form-btn back-for-float-right"style="background: -webkit-linear-gradient(left, #001d4a, #00c6fb);" >
//                                           <%=currentUser.username%>:

//                                                 <%=messagesy[j]%>
//                                             </a>
//                                         </div>
//                                     </div>