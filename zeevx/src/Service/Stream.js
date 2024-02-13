import { useState, useEffect } from "react";
import { config, useClient, useMicrophoneAndCameraTracks} from './VideoCall.js';
import { Grid} from "@material-ui/core";

export default function Stream(props) {
    const {setInCall} = props;
    const [users, setUsers]= useState([])
    const [start, setStart] = useState(false)
    const client = useClient();
    const {ready, tracks}= useMicrophoneAndCameraTracks();

    useEffect(()=> {
        let init = async (name) => {
            client.on("user-published", async (user, mediaType) =>{
                await client.subscribe(user, mediaType);
                if (mediaType === "video "){
                    setUsers((prevUsers) => {
                        return[ ...prevUsers, users];
                    });
                }
                if (mediaType === "audio"){
                    user.audioTrack.Play();
                }
            });

            client.on("user-unpublished", (user, mediaType) => {
            if (mediaType === 'audio'){
                if (user.audioTract) user.audioTrack.stop();
            }
            if (mediaType === "video"){
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);

                });
            }

        });
        client.on("user-left", (user) => {
            setUsers((prevUsers) => {
                return prevUsers.filter((User) => User.uid !== user.uid);
            });
        });
        try {
            await client.join(config.appId, name, config.token, null)
        } catch (error){
            console.log("error");
        }
        if (tracks) await client.publish([tracks[0], tracks[1]]);
            setStart(true);
    };
    }, [channelName, client, ready, tracks]);
}