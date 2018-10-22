import React, { Component } from 'react';
import avatar from '../images/avartar.jpg';

export default class Messenger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height:window.innerHeight,
        }

        this._onResize = this._onResize.bind(this)
    }

    _onResize() {
        this.setState({
            height:window.innerHeight,
        });
    }

    componentDidMount() {
        console.log("Component did mount");
        window.addEventListener('resize', this._onResize)
    }

    componentWillUnmount() {
        console.log("Compnent un mount");
        window.removeEventListener('resize', this._onResize)

    }

    render() {
        const {height} = this.state;
        const style = {
            height:height,
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
                            <div className="profile-image"><img src={avatar} alt="" /></div>
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="sidebar-left"> Left sidebar</div>
                    <div className="content">
                        <div className="messages">
                            <div className="message">
                                <div className="message-user-image">
                                    <img src={avatar} alt="" />
                                </div>
                                <div className="message-body">
                                    <div className="message-author"> Tom said:</div>
                                    <div className="message-text">
                                        <p>
                                            Hello there ...
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="message">
                                <div className="message-user-image">
                                    <img src={avatar} alt="" />
                                </div>
                                <div className="message-body">
                                    <div className="message-author"> You said:</div>
                                    <div className="message-text">
                                        <p>
                                            I am here ...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-right"> Right sidebar</div>
                </div>
            </div>
        )

    }
}