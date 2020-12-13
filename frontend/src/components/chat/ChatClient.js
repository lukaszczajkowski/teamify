/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import ChatApi from '../../api/ChatApi';
import './ChatClient.css';
import { Button, message } from "antd";
import ScrollToBottom from "react-scroll-to-bottom";
import UserApi from '../../api/UserApi';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useRecoilState } from "recoil";
import {
  chatActiveContact,
  chatMessages,
} from "../../atom/globalState";

const wsEndpoint = 'http://localhost:8080/ws';
const sockJsConfig = {
      transports: ['xhr-streaming'],
      headers: { Authorization: window.sessionStorage.getItem("_token") }
}

var stompClient = null;
// let stompClient = Stomp.over(socket);
//eslint-disable-line no-undef
// eslint-disable-next-line react/prop-types
export default function ChatClient(props) {
    const project = props.location.props.project;
    const [currentUser, setCurrentUser] = useState({});
    const [text, setText] = useState("");
    const [contacts, setContacts] = useState([]);
    const [activeContact, setActiveContact] = useRecoilState(chatActiveContact);
    const [messages, setMessages] = useRecoilState(chatMessages);
    // eslint-disable-next-line no-unused-vars
    const [currentProject, setCurrentProject] = useState({});
    //const [changesMade, setChangesMade] = useState(false);

    useEffect(() => {
      setCurrentProject(project);
      UserApi.getCurrentUser().then(response => setCurrentUser(response.data))
      .then(() => {
        loadContacts();
        connect();
      }
    );
    }, [])

    useEffect(() => {
      if(activeContact === undefined) return;
        if(activeContact === currentProject) {
            ChatApi.findProjectMessages(currentProject.id).then((msgs) =>
            setMessages(msgs.data)
            ).catch(err => console.log(err))
          } else {
          ChatApi.findChatMessages(activeContact.id).then((msgs) =>
          setMessages(msgs.data)
          ).catch(err => console.log(err))
          }
      loadContacts();
  }, [activeContact]);


    useEffect(() => {
        if(activeContact === undefined) return;
        const interval = setInterval( () => {
          if(activeContact === currentProject) {
              ChatApi.findProjectMessages(currentProject.id).then((msgs) =>
              setMessages(msgs.data)
              ).catch(err => console.log(err))
            } else {
            ChatApi.findChatMessages(activeContact.id).then((msgs) =>
            setMessages(msgs.data)
            ).catch(err => console.log(err))
            }
          }, 3000)
        loadContacts();
        return () => clearInterval(interval)
    }, [activeContact]);

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

    const onMessageReceived = async (msg) => {
        const notification = JSON.parse(msg.body);
        console.log("notification:", notification)
        const active = JSON.parse(sessionStorage.getItem("recoil-persist"))
        .chatActiveContact;
    
        if (active.id === notification.senderId) {
            await ChatApi.findChatMessage(notification.id).then((message) => {
            const newMessages = JSON.parse(sessionStorage.getItem("recoil-persist"))
                      .chatMessages;
            newMessages.push(message);
            setMessages(newMessages);
            });
        } else {
          message.info("Received a new message from " + notification.senderName);
          alert("Received a new message from " + notification.senderName);
        }

        loadContacts();
      };

    const sendMessage = (msg) => {
          let message;
          if(activeContact.email === undefined) {
            if(msg.trim() !== ""){
              message = {
                  senderId: currentUser.id,
                  recipientId: currentProject.id,
                  senderName: currentUser.name,
                  recipientName: currentProject.title,
                  content: msg,
                  timestamp: new Date()
            };
          }
            stompClient.send("/app/chat/general/", {}, JSON.stringify(message))
          } else {
            if(msg.trim() !== ""){
              message = {
                  senderId: currentUser.id,
                  recipientId: activeContact.id,
                  senderName: currentUser.name,
                  recipientName: activeContact.name,
                  content: msg,
                  timestamp: new Date()
            };
            stompClient.send("/app/chat", {}, JSON.stringify(message));
          }
            const newMessages = [...messages];
            newMessages.push(message);
            setMessages(newMessages);
        }
    };

      const loadContacts = () => {
        const promise = UserApi.getUsersFromSharedProjects().then(response => response.data.filter(user => user.name !== currentUser.name))
        .then((users) => users.map((contact) => 
          ChatApi.countNewMessages(contact.id)
                  .then((count) => {
                          contact.newMessages = count.data;
            return contact;
          })
        ))
    
        promise.then((promises) =>
          Promise.all(promises).then((users) => {
            setContacts(users);
            if (activeContact === undefined && users.length > 0) {
              setActiveContact(project);
            }
          })
        );
      };

      return (
        <div id="chat">
        <div id="frame">
          <div id="sidepanel">
            <div id="profile">
              <div className="wrap">
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
            {/* <div id="search" /> */}
            <div id="contacts">
              <div id="contact-prompt">Contacts:</div>
              
              <ul>
                {contacts.map((contact) => (
                  // eslint-disable-next-line react/jsx-key
                  <li
                    onClick={() => setActiveContact(contact)}
                    className={
                      activeContact && contact.id === activeContact.id && activeContact !== currentProject
                        ? "contact active"
                        : "contact"
                    }
                  >
                    <div className="wrap">
                      <span className="contact-status online"></span>
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
                <li
                  onClick = {() => setActiveContact(currentProject)}
                  className={
                    activeContact && activeContact === currentProject
                      ? "contact active"
                      : "contact"
                  }
                >
                  <div className="wrap">
                      <span className="contact-status online"></span>
                      <div className="meta">
                        <p className="name">General</p>
                        {activeContact === currentProject && currentProject !== undefined && currentProject.newMessages !== undefined &&
                          currentProject.newMessages > 0 && (
                            <p className="preview">
                              {currentProject.newMessages} new messages
                            </p>
                          )}
                      </div>
                    </div>
                </li>
              </ul>
            </div>
            
          </div>
          <div className="content">
            <div className="contact-profile">
              <img src={activeContact && activeContact.profilePicture} alt="" />
              <p>{activeContact && activeContact.name}</p>
            </div>
            
            <ScrollToBottom className="messages">
              <ul>
                {messages.map((msg) => (
                  // eslint-disable-next-line react/jsx-key
                  <li className={msg.senderId === currentUser.id ? "sent" : "replies"}>
                    <p>{msg.senderName}: {msg.content}</p>
                  </li>
                ))}
              </ul> 
            
            </ScrollToBottom>
            <p>
            </p>
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
        </div>
      );
}