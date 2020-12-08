import React, { useEffect, useState } from 'react';
import ChatApi from '../../api/ChatApi';
import './ChatClient.css';
import { Button, message } from "antd";
import ScrollToBottom from "react-scroll-to-bottom";
import UserApi from '../../api/UserApi';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const wsEndpoint = 'http://localhost:8080/ws';
const sockJsConfig = {
      transports: ['xhr-streaming'],
      headers: { Authorization: window.sessionStorage.getItem("_token") }
}

var stompClient = null;
// let stompClient = Stomp.over(socket);
//eslint-disable-line no-undef
export default function ChatClient() {

    const [currentUser, setCurrentUser] = useState({});
    const [activeContact, setActiveContact] = useState({});
    const [text, setText] = useState("");
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);
    //const [changesMade, setChangesMade] = useState(false);

    useEffect(() => {
      UserApi.getCurrentUser().then(response => setCurrentUser(response.data))
      .then(() => {
        loadContacts();
        connect();
      }
    );
    }, [])


    useEffect(() => {
        if(activeContact === undefined) return;
        ChatApi.findChatMessages(activeContact.id).then((msgs) =>
          setMessages(msgs.data)
        ).catch(err => console.log(err));
        loadContacts();
    }, [activeContact]);

    console.log("Current user", currentUser);
    console.log("Active contact", activeContact);

    // eslint-disable-next-line no-unused-vars
    const connect = () => {
      var socket = new SockJS(wsEndpoint, null, sockJsConfig);
      stompClient = Stomp.over(socket);
      stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        console.log("connected");
        
        stompClient.subscribe(
            "/user/" + currentUser.id + "/queue/messages",
            onMessageReceived
        );
    };

    const onError = (err) => {
        console.log(err);
    };

    const onMessageReceived = (msg) => {
        const notification = JSON.parse(msg.body);
    
        if (activeContact.id === notification.senderId) {
            ChatApi.findChatMessage(notification.id).then((message) => {
            const newMessages = JSON.parse(sessionStorage.getItem("recoil-persist"))
                      .chatMessages;
            newMessages.push(message);
            setMessages(newMessages);
            });
        } else {
        message.info("Received a new message from " + notification.senderName);
        }
        loadContacts();
      };

    const sendMessage = (msg) => {
        if(msg.trim() !== ""){
            const message = {
                senderId: currentUser.id,
                recipientId: activeContact.id,
                senderName: currentUser.name,
                content: msg,
                timestamp: new Date()
            };
            stompClient.send("/app/chat", {}, JSON.stringify(message));
            const newMessages = [...messages];
            newMessages.push(message);
            setMessages(newMessages);
        }
    };

    const loadContacts = async() => {
        // eslint-disable-next-line no-undef
        await UserApi.getUsersFromSharedProjects().then((response) =>
          setContacts(response.data)
        ).then(() => {
          if(activeContact === undefined && contacts.length > 0) {
            setActiveContact(contacts[0])
          }
        })
        console.log("contacts loaded");
      };

      return (
        <div id="frame">
          <div id="sidepanel">
            <div id="profile">
              <div className="wrap">
                <img
                  id="profile-img"
                  src={currentUser.profilePicture}
                  className="online"
                  alt=""
                />
                <p>{currentUser.name}</p>
                <div id="status-options">
                  <ul>
                    <li id="status-online" className="active">
                      <span className="status-circle"></span> <p>Online</p>
                    </li>
                    <li id="status-away">
                      <span className="status-circle"></span> <p>Away</p>
                    </li>
                    <li id="status-busy">
                      <span className="status-circle"></span> <p>Busy</p>
                    </li>
                    <li id="status-offline">
                      <span className="status-circle"></span> <p>Offline</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div id="search" />
            <div id="contacts">
              Contacts:
              <ul>
                {contacts.map((contact) => (
                  // eslint-disable-next-line react/jsx-key
                  <li
                    onClick={() => setActiveContact(contact)}
                    className={
                      activeContact && contact.id === activeContact.id
                        ? "contact active"
                        : "contact"
                    }
                  >
                    <div className="wrap">
                      <span className="contact-status online"></span>
                      <img id={contact.id} src={contact.profilePicture} alt="" />
                      <div className="meta">
                        <p className="name">{contact.name}</p>
                        {contact.newMessages !== undefined &&
                          contact.newMessages > 0 && (
                            <p className="preview">
                              {contact.newMessages} new messages
                            </p>
                          )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="content">
            <div className="contact-profile">
              <img src={activeContact && activeContact.profilePicture} alt="" />
              <p>{activeContact && activeContact.name}</p>
            </div>
            <ScrollToBottom className="messages">
            {/* {messages !== undefined ? */}
              <ul>
                {messages.map((msg) => (
                  // eslint-disable-next-line react/jsx-key
                  <li className={msg.senderId === currentUser.id ? "sent" : "replies"}>
                    {msg.senderId !== currentUser.id && (
                      <img src={activeContact.profilePicture} alt="" />
                    )}
                    <p>{msg.content}</p>
                  </li>
                ))}
              </ul> 
              
              {/* : 
              null */}
            </ScrollToBottom>
            <div className="message-input">
              <div className="wrap">
                <input
                  name="user_input"
                  size="large"
                  placeholder="Write your message..."
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      sendMessage(text);
                      setText("");
                    }
                  }}
                />
    
                <Button
                  icon={<i className="fa fa-paper-plane" aria-hidden="true"></i>}
                  onClick={() => {
                    sendMessage(text);
                    setText("");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );
}