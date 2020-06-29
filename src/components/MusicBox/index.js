import React, { Component } from 'react';
import ReactPlayer from 'react-player';

import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
class MusicBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null,
            controls: true,
            volume: 50,
            progress: 0,
        }
    }
    setMusic = () => {
        this.setState({ url: 'https://www.youtube.com/watch?v=Y1e1wl8ngfw' })
    }
    handleVolume = (event, value) => {

        console.log("Volume Change: ", value);
        this.setState({ volume: value });
    }
    handleProgressSeek = (event, value) => {

        console.log("Process Seek: ", event, value);
        this.setState({ progress: value });
        // this.player.seekTo(1)
    }
    handleProgress = (event, value) => {

        console.log("Process Change: ", event, value);
        // this.setState({ progress: event.target.value });
        // this.player.seekTo(1)
        console.log(this)
    }
    render() {
        return (
            <div className='music-box'>
                <ReactPlayer
                    ref={this.ref}
                    className='react-player'
                    width='600px'
                    height='400px'
                    url={this.state.url}
                    // pip={pip}
                    playing={true}
                    controls={this.state.controls}
                    // light={light}
                    // loop={loop}
                    // playbackRate={playbackRate}
                    volume={this.state.volume / 100}
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
                    onProgress={this.handleProgress}
                // onDuration={console.log}
                />
                <div className="music-box-control" style={{ width: '300px' }}>
                    <button onClick={this.setMusic}>Đổi bài</button>
                    <Grid container spacing={2}>
                        <Grid item>
                            <VolumeDown />
                        </Grid>
                        <Grid item xs>
                            <Slider value={this.state.volume} onChange={this.handleVolume} aria-labelledby="continuous-slider" />
                        </Grid>
                        <Grid item>
                            <VolumeUp />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <Slider value={this.state.progress} onChange={this.handleProgressSeek} aria-labelledby="continuous-slider" />
                        </Grid>
                    </Grid>

                </div>
            </div>
        )
    }
}
export default MusicBox;