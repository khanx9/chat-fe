import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

const SOCKET_ENDPOINT = 'http://localhost:3000';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chat-ib';
  socket;
  message: string;
  isMine = false;
  constructor() {
    // console.log(io)
  }

  ngOnInit() {
    this.setupSocketConnection()
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
      console.log('hey',data);
      if (data) {
        const element = document.createElement('div');
        const para = document.createElement('div');
        para.innerHTML = data;
        para.style.padding = '10px 30px';
        para.style.background = '#fff';
        // element.style.background = 'white';
        para.style.borderRadius = '10px';
        para.style.margin = '10px';
        element.style.minWidth = '10px';
        // element.style.maxWidth = '50%';
        element.style.textAlign = 'left';
        element.style.display = 'flex';
        element.style.justifyContent = 'flex-start';
        element.appendChild(para);
        document.getElementById('message-list').style.justifyContent = 'flex-right';
        document.getElementById('message-list').appendChild(element);
      }
    });
  }

  SendMessage() {
    this.socket.emit('message', this.message);
    this.isMine = true;
    const element = document.createElement('div');
    const para = document.createElement('div');
    para.innerHTML = this.message;
    // element.style.background = 'blue';
    para.style.padding = '10px 30px';
    para.style.background = 'blue';
    element.style.color = 'white';
    para.style.borderRadius = '10px';
    para.style.margin = '10px';
    element.style.minWidth = '10px';
    element.style.textAlign = 'right';
    element.style.display = 'flex';
    element.style.justifyContent = 'flex-end';
    element.appendChild(para);
    document.getElementById('message-list').style.justifyContent = 'flex-end';
    document.getElementById('message-list').appendChild(element);
    this.message = '';
  }

}
