import React, { Component } from 'react';
import ReactPlayer from 'react-player';
class MusicBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null,
            controls: false,
        }
        this.setMusic = this.setMusic.bind(this)
    }
    setMusic() {
        this.setState({ url: 'https://www.youtube.com/watch?v=Y1e1wl8ngfw' })
    }
    render() {
        return (
            <div className='music-box'>
                <ReactPlayer
                    ref={this.ref}
                    className='react-player'
                    width='0'
                    height='0'
                    url={this.state.url}
                // pip={pip}
                // playing={playing}
                // controls={controls}
                // light={light}
                // loop={loop}
                // playbackRate={playbackRate}
                // volume={volume}
                // muted={muted}
                // onReady={() => console.log('onReady')}
                // onStart={() => console.log('onStart')}
                // onPlay={this.handlePlay}
                // onEnablePIP={this.handleEnablePIP}
                // onDisablePIP={this.handleDisablePIP}
                // onPause={this.handlePause}
                // onBuffer={() => console.log('onBuffer')}
                // onSeek={e => console.log('onSeek', e)}
                // onEnded={this.handleEnded}
                // onError={e => console.log('onError', e)}
                // onProgress={this.handleProgress}
                // onDuration={this.handleDuration}
                />
                <div className="music-box-control">
                    <button onClick={this.setMusic}>Đổi bài</button>
                </div>
            </div>
        )
    }
}
export default MusicBox;