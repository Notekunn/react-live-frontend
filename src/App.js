import React/* , { useEffect, useState } */ from 'react';
import io from 'socket.io-client';
const server = "https://8080-d4c71721-ae9b-4039-a60f-85529056ee9f.ws-us02.gitpod.io/"
const isEqual = require("react-fast-compare");
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: []
        }
        this.socket = null;
    }
    componentDidMount() {
        this.socket = io(server);
        console.log(this.socket)
        this.socket.on('connect', console.log);
        this.socket.on('comment', (data) => {
            if (isEqual(data[0], this.state.comment[0])) return;
            this.setState((prevState) => {
                return { comment: data }
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
                {this.state.comment.map((e, i) => <div key={i}>{JSON.stringify(e)}</div>)}
            </div>
        );
    }
}

// function App() {
//     const [comment, setComment] = useState([]);
//     useEffect(function () {
//         const socket = io(server);
//         console.log(socket)
//         socket.on('connect', console.log);
//         socket.on('comment', (data) => {
//             console.log(comment)
//             // if (isEqual(data[0], comment[0])) return;
//             setComment(comment => data);
//             console.log(socket.id, data)
//         });
//         socket.on('disconnect', function () {
//             console.log(socket.id)
//         });
//         return () => {
//             socket.disconnect()
//             socket.destroy()
//         }
//     }, [])
//     return (
//         <div className="App">
//             {comment.map((e, i) => <div key={i}>{e.a}</div>)}
//         </div>
//     );
// }

export default Main;
