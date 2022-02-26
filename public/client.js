const socket = io()

let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')

do{
    name = prompt("jaldi apna naam daal panwel nikalna hai:")
}while(!name)

textarea.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(o_msg){
    let msg = {
        user: name,
        message: o_msg.trim()
    }

    //append to DOM
    appendMessage(msg,'outgoing')
    textarea.value = ''
    scrollToBottom()
    // send to server
    socket.emit('message',msg)
}


function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    mainDiv.classList.add(type,'message') // giving both classes to div one via type and another one is message

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})


function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}