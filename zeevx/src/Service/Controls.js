import {useState } from 'react';
import { useClient } from "./"
import {Grid, Button, Icon} from '@material-ui/core';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function Controls(props){
    const client = useClient();
    const { tracks, setStart, SetInCall } =props;
    const [trackState, setTrackState] = useState({ video: true, audio: true});
    
    const mute = async (type) =>{
        if (type === 'audio'){
            await tracks[0].setEnabled(!trackState.audio);
            setTrackState((ps) => {
                return { ...ps, audio: !ps.audio};
            });
        }
        if (type === 'video'){
            await tracks[1].setEnabled(!trackState.video);
            setTrackState((ps) => {
                return { ...ps, video: !ps.video};
            });
        }
    };


    const leaveChannel = async () =>{
        await client.leave();
        client.removeAllListeners();
        tracks[0].close();
        trsck[1].close();
        setStart(false);
        SetInCall(false);

    };
    return(
        <Grid container spacing={2} alighItems="center">
            <Grid items>
                <Button variant="contained" 
                color={trackState.audio ? "primary" : "secondary"}
                onClick={() => mute("audio")}
                >
                    {trackState.audio ? <MicIcon/> : <MicOffIcon/>}
                </Button>
            </Grid>
            <Grid items>
            <Button variant="contained" 
                color={trackState.video ? "primary" : "secondary"}
                onClick={() => mute("video")}
                >
                    {trackState.video ? <VideocamIcon/> : <VideocamOffIcon/>}
                </Button>
            </Grid>
            <Grid items>
            <Button variant="contained" 
                color="default"
                onClick={() => leaveChannel()}
                >
                    Leave
                    <ExitToAppIcon />
                </Button>
            </Grid>

            </Grid>
    )

}