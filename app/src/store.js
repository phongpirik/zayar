import {OrderedMap} from 'immutable';

const users = OrderedMap({
    1: {_id:1, name:"Phong", create: new Date()},
    2: {_id:2, name:"Hà", create: new Date()},
    3: {_id:3, name:"Ngọc", create: new Date()},
    4: {_id:4, name:"Chi", create: new Date()},
})

export default class Store{
    constructor(appComponent) {
        this.app = appComponent;
        this.messages = new OrderedMap();
        this.channels = new OrderedMap();
        this.activeChannelId = null;
        this.user = {
            _id : 0,
            name: 'Phong',
            create: new Date(),
        }
    }

    setActiveChannelId(id) {
        this.activeChannelId = id;
        this.update();
    }

    getActiveChannel() {
        const channel = this.activeChannelId ? this.channels.get(this.activeChannelId) : this.channels.first();
        return channel;
    }

    addMessage(index, message = {}) {
        this.messages = this.messages.set(index,message);
        this.update();
    }
    getMessages() {
        return this.messages.valueSeq();
    }

    getMessagesFromChannel(channel) {
        let messages = [];

        if (channel) {
            channel.messages.map((value, key) => {
               console.log(value, key);

               const message = this.messages.get(key);
               messages.push()
            });
        }
        return messages;
    }

    addChannel(index, channel = {}) {
        this.channels = this.channels.set(index,channel);
        this.update();
    }
    getChannels() {
        return this.channels.valueSeq();
    }

    update() {
        this.app.forceUpdate();
    }
}