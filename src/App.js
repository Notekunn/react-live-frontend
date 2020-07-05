import React, { /* Fragment,  */Component/*  useEffect, useState */ } from 'react';
import isEqual from 'react-fast-compare';
import io from 'socket.io-client';
import Comment from './components/Comment';
import MusicBox from './components/MusicBox';
const server = "https://8080-d4c71721-ae9b-4039-a60f-85529056ee9f.ws-us02.gitpod.io/"
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
        this.socket = null;
    }
    componentDidMount() {
        this.socket = io(server);
        console.log(this.socket)
        this.socket.on('connect', console.log);
        this.socket.on('comments', (data) => {
            if (isEqual(data[0], this.state.comments[0])) return;
            this.setState(() => {
                return { comments: data }
            });
            console.log(this.socket.id, data)
        });
        this.socket.on('disconnect', () => {
            console.log(this.socket.id)
        })
    }
    componentWillUnmount() {
        this.socket.disconnect()
        this.socket.destroy()
    }
    componentDidUpdate() {
        console.log("------------------------Rerender-----------------")
    }
    render() {
        console.log("------------------------render-------------------")
        return (
            <div className="App">
                <Comment comments={this.state.comments} />
                <MusicBox />
            </div>
        );
    }
}

export default Main;
