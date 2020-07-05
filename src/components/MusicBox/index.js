import React, { Component } from 'react';
import ReactPlayer from 'react-player';

import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import VolumeDown from '@material-ui/icons/VolumeDownRounded';
import VolumeUp from '@material-ui/icons/VolumeUpRounded';
import SkipPreviousIcon from '@material-ui/icons/SkipPreviousRounded';
import SkipNextIcon from '@material-ui/icons/SkipNextRounded';
import PauseIcon from '@material-ui/icons/PauseRounded';
import PlayIcon from '@material-ui/icons/PlayArrowRounded';
import MusicNoteIcon from '@material-ui/icons/MusicNoteRounded';
import EditIcon from '@material-ui/icons/EditRounded';
import QueueMusicIcon from '@material-ui/icons/QueueMusicRounded';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAddRounded';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import styles from './index.module.scss';
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
            isOpen: false,
            isType: false,
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
                    width='0px'
                    height='0px'
                    url={this.state.url}
                    // pip={pip}
                    playing={this.state.playing}
                    controls={this.state.controls}
                    volume={this.state.volume}
                    onReady={() => console.log('onReady')}
                    onStart={() => console.log('onStart')}
                    onPlay={() => this.setState({ playing: true })}
                    onPause={() => this.setState({ playing: false })}
                    onEnded={this.handleNext}
                    onError={e => console.log('onError', e)}
                    onProgress={this.handleProgress}
                    onDuration={this.handleDuration}
                />
                <div className={styles.music_box_control}>
                    <Grid container spacing={2} justify="space-around" alignItems="center">
                        <Button variant="outlined" color="primary" onClick={() => this.setState({ isOpen: true })}>Chỉnh list nhạc</Button>
                        <Dialog maxWidth="md" scroll="paper" fullWidth open={this.state.isOpen} onClose={() => this.setState({ isOpen: false })} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">
                                <Grid container spacing={2} alignItems="center" justify="center">
                                    <Grid item xs={2} align="center"><QueueMusicIcon fontSize="large" color="primary" /></Grid>
                                    <Grid item xs={8} align="center">{" Danh sách nhạc "}</Grid>
                                    <Grid item xs={2} align="center"><Button onClick={() => this.setState({ isType: true })}><PlaylistAddIcon fontSize="large" color="primary" /></Button></Grid>
                                </Grid>
                            </DialogTitle>
                            <DialogContent>
                                <Grid container direction="column" spacing={3}>
                                    {this.state.list.map((e, i) =>
                                        <Grid container key={i} direction="row" justify="center" alignItems="center">
                                            <Grid item xs={1} align="center">
                                                <MusicNoteIcon fontSize="large" color="primary" />
                                            </Grid>
                                            <Grid item xs={10} align="left">
                                                <Typography>{e.url}</Typography>
                                            </Grid>
                                            <Grid item xs={1} align="center">
                                                <Button>
                                                    <EditIcon fontSize="default" color="primary" />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    )}
                                    {this.state.isType &&
                                        <Grid container direction="row" justify="center" alignItems="center">
                                            <Grid item xs={10} >
                                                <TextField variant="outlined" size="small" fullWidth ></TextField>
                                            </Grid>
                                            <Grid item xs={2} align="center">
                                                <Button variant="outlined" size="large" color="primary" onClick={() => this.setState({ isType: false })}>Thêm</Button>
                                            </Grid>
                                        </Grid>
                                    }
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.setState({ isOpen: false })} color="primary">
                                    {'Cancel'}
                                </Button>
                                <Button onClick={() => this.setState({ isOpen: false })} color="primary">
                                    {'Update'}
                                </Button>
                            </DialogActions>
                        </Dialog>
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
                        <Grid item xs align="center">
                            <SkipPreviousIcon color="primary" fontSize="large" onClick={this.handlePrevious} />
                        </Grid>
                        <Grid item xs align="center">
                            {this.state.playing ?
                                <PauseIcon fontSize="large" color="secondary" onClick={this.handlePlayPause} /> :
                                <PlayIcon fontSize="large" color="primary" onClick={this.handlePlayPause} />}
                        </Grid>
                        <Grid item xs align="center">
                            <SkipNextIcon color="primary" fontSize="large" onClick={this.handleNext} />
                        </Grid>

                    </Grid>
                </div>
            </div>
        )
    }
}
export default MusicBox;