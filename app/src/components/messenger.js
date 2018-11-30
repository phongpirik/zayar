import React, {Component} from 'react';
import classNames from 'classnames';

import avatar from '../images/avartar.jpg';
import {OrderedMap} from 'immutable';

import _ from 'lodash';

export default class Messenger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: window.innerHeight,
        }

        this._onResize = this._onResize.bind(this);

        this.addTestMessages = this.addTestMessages.bind(this);
    }

    _onResize() {
        this.setState({
            height: window.innerHeight,
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this._onResize);
        this.addTestMessages();
    }

    addTestMessages() {
        const {store} = this.props;



        //create test messages
        for (let i = 0; i < 100; i++) {
            let isMe = false;
            if (i % 3 === 0) {
                isMe = true;
            }
            const newMsg = {
                author: `Author: ${i}`,
                body: `The body of message ${i}`,
                avatar: avatar,
                me: isMe,
            };
            store.addMessage(i, newMsg);
            // i need update my component and re-render it now because new messages added.

        }

        //create some test channel
        for (let c = 0; c < 10; c++) {
            const newChannel = {
                _id: c,
                title: `Channel title ${c}`,
                lastMessage: `Hey there here ... ${c}`,
                members: new OrderedMap({
                    2: true,
                    3: true,
                }),
                messages: new OrderedMap({
                    5: true,
                    6: true,
                    7: true,
                }),
            }
            store.addChannel(c, newChannel)
        }

    }

    componentWillUnmount() {
        console.log("Compnent un mount");
        window.removeEventListener('resize', this._onResize)

    }

    render() {
        const {store} = this.props;
        const {height} = this.state;
        const style = {
            height: height,
        }

        const activeChannel = store.getActiveChannel();
        const messages = store.getMessagesFromChannel(activeChannel); //store.getMessages();
        const channels = store.getChannels();

        if (activeChannel) {
            console.log('Active channel is:',activeChannel);
            console.log('Message in channel: ', activeChannel._id, messages);
        }

        return (
            <div style={style} className="app-messenger">
                <div className="header">
                    <div className="left">
                        <div className="actions">
                            <button>New message</button>
                        </div>
                    </div>
                    <div className="content"><h2>Title</h2></div>
                    <div className="right">
                        <div className="user-bar">
                            <div className="profile-name">Thanh Phong Nguyen</div>
                            <div className="profile-image"><img src={avatar} alt=""/></div>
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="sidebar-left">
                        <div className="chanels">
                            {channels.map((channel, key) => {
                                return (

                                    <div onClick={(key) => {
                                        store.setActiveChannelId(channel._id);

                                    }} key={channel._id} className="chanel">
                                        <div className="user-image">
                                            <img src={avatar} alt=""/>
                                        </div>
                                        <div className="chanel-info">
                                            <h2>{channel.title}</h2>
                                            <p>{channel.lastMessage}</p>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                    <div className="content">
                        <div className="messages">

                            {messages.map((message, index) => {

                                console.log(index,message);
                                return (
                                    <div key={index} className={classNames('message', {'me': message.me})}>
                                        <div className="message-user-image">
                                            <img src={message.avatar} alt=""/>
                                        </div>
                                        <div className="message-body">
                                            <div className="message-author"> {message.author} said:</div>
                                            <div className="message-text">
                                                <p>
                                                    {message.body}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )

                            })}
                        </div>

                        <div className="messages-input">
                            <div className="text-input">
                                <textarea placeholder="Write your messages..."/>
                            </div>
                            <div className="actions">
                                <button className="send">Send</button>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-right">
                        <h2 className="title">Members</h2>
                        <div className="members">
                            <div className="member">
                                <div className="user-image">
                                    <img src={avatar} alt=""/>
                                </div>
                                <div className="member-info">
                                    <h2>Toan Nguyen Dinh</h2>
                                    <p>Joined: 3 days ago.</p>
                                </div>
                            </div>

                            <div className="member">
                                <div className="user-image">
                                    <img src={avatar} alt=""/>
                                </div>
                                <div className="member-info">
                                    <h2>Alexander</h2>
                                    <p>Joined: 3 days ago.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}