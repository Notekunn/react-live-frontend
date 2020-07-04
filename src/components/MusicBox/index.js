import React, { Component } from 'react';
import ReactPlayer from 'react-player';

import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Modal from "@material-ui/core/Modal";

import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import PlayIcon from '@material-ui/icons/PlayArrow';

import styles from './index.module.css';
class MusicBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null,
            list: [{
                url: 'https://www.youtube.com/watch?v=oUFJJNQGwhk',
                name: ''
            }, {
                url: 'https://www.youtube.com/watch?v=JahJfGvn_zQ',
                name: ''
            }, {
                url: 'https://www.youtube.com/watch?v=euCF_BcJpt0',
                name: ''
            }],
            currentIndex: -1,
            controls: true,
            volume: 0.5,
            played: 0,
            playing: false,
            seeking: false,
        }
    }
    componentDidMount() {
        let { list, currentIndex } = this.state;
        if (list.length === 0) return;
        currentIndex = (currentIndex + 1) % list.length;
        this.setState({
            url: list[currentIndex].url,
            currentIndex,
        })
    }
    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing });
    }
    handleVolume = (event, value) => {

        console.log("Volume Change: ", value);
        this.setState({ volume: value });
    }
    handleProgress = (state) => {

        // console.log("onProgress: ", state);
        if (!this.state.seeking) {
            this.setState({ played: state.played });
        }
    }
    handleDuration = (duration) => {
        console.log('onDuration: ', duration);
        this.setState({ duration })
    }
    handleSeek = (event, value) => {

        // console.log("Seeking: ", event, value);
        this.setState({ played: value, seeking: true });
    }
    handleSeekCommited = (event, value) => {
        // console.log("Seek end: ", event, value);
        this.setState({ played: value, seeking: false });
        this.player.seekTo(parseFloat(value))
    }
    ref = player => {
        this.player = player;
    }
    handlePrevious = () => {

        let { list, currentIndex } = this.state;
        if (list.length === 0) return;
        currentIndex = (currentIndex + list.length - 1) % list.length;
        this.setState({
            url: list[currentIndex].url,
            currentIndex,
            played: 0,
        })
    }
    handleNext = () => {

        let { list, currentIndex } = this.state;
        if (list.length === 0) return;
        currentIndex = (currentIndex + 1) % list.length;
        this.setState({
            url: list[currentIndex].url,
            currentIndex,
            played: 0,
        })
    }
    render() {
        return (
            <div className={styles.music_box}>
                <ReactPlayer
                    ref={this.ref}
                    className='react-player'
                    width='600px'
                    height='400px'
                    url={this.state.url}
                    // pip={pip}
                    playing={this.state.playing}
                    controls={this.state.controls}
                    // light={light}
                    // loop={loop}
                    // playbackRate={playbackRate}
                    volume={this.state.volume}
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
                    onDuration={this.handleDuration}
                />
                <div className={styles.music_box_control}>
                    <Grid container spacing={2}>
                        <Button>Chỉnh list nhạc</Button>
                        <Modal open={false}>
                            <div style={{
                                position: 'absolute',
                                width: 400,
                                backgroundColor: '#ffffff',
                                border: '2px solid #000',
                                // boxShadow: theme.shadows[5],
                                padding: '5px',
                            } }>
                                <h2 id="simple-modal-title">Text in a modal</h2>
                                <p id="simple-modal-description">
                                    {'Duis mollis, est non commodo luctus, nisi erat porttitor ligula.'}
                                </p>
                            </div>
                        </Modal>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item>
                            <VolumeDown />
                        </Grid>
                        <Grid item xs>
                            <Slider value={this.state.volume} onChange={this.handleVolume} min={0} max={1} step={0.01} aria-labelledby="continuous-slider" />
                        </Grid>
                        <Grid item>
                            <VolumeUp />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs style={{ marginLeft: '8px' }}>
                            <Slider value={this.state.played} min={0} max={1} step={0.001} onChange={this.handleSeek} onChangeCommitted={this.handleSeekCommited} aria-labelledby="continuous-slider" />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs >
                            <SkipPreviousIcon fontSize="large" onClick={this.handlePrevious} />
                        </Grid>
                        <Grid item xs>
                            {this.state.playing ?
                                <PauseIcon fontSize="large" onClick={this.handlePlayPause} /> :
                                <PlayIcon fontSize="large" onClick={this.handlePlayPause} />}
                        </Grid>
                        <Grid item xs>
                            <SkipNextIcon fontSize="large" onClick={this.handleNext} />
                        </Grid>

                    </Grid>
                </div>
            </div>
        )
    }
}
export default MusicBox;