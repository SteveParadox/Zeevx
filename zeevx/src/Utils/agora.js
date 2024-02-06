import React, { useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk';

const Agora = () => {
  const agoraClient = useRef(null);
  const [remoteStreams, setRemoteStreams] = useState([]);

  const handleUserPublished = (user, mediaType) => {
    // Subscribe to the remote user's stream
    agoraClient.current.subscribe(user, mediaType, (remoteStream) => {
      // Save the remote stream in the state
      setRemoteStreams((prevStreams) => [...prevStreams, remoteStream]);
    });
  };

  const handleUserUnpublished = (user) => {
    // Remove the remote user's stream from the state
    setRemoteStreams((prevStreams) =>
      prevStreams.filter((stream) => stream.getId() !== user.uid),
    );
  };


  useEffect(() => {
    // Initialize Agora SDK
    agoraClient.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    const channelName = 'general';


    agoraClient.current.on('user-published', handleUserPublished);
    agoraClient.current.on('user-unpublished', handleUserUnpublished);

    // Join the channel
    agoraClient.current.init('f3bd94d6c4cc45db9dcff1251c4ba7b4', () => {
      console.log('AgoraRTC client initialized');

      // Join channel upon success
      agoraClient.current.join(
        null, // Token, if your project has token validation
        channelName, // Channel name
        null, // User ID, leave empty to be assigned one by Agora
        (uid) => {
            console.log('User ' + uid + ' joined');
  
            // Enable the local video
            agoraClient.current.enableLocalVideo();
  
            // Set up the local video stream
            const localStream = AgoraRTC.createStream({
              streamID: uid,
              audio: true,
              video: true,
            });
  
            // Initialize the local stream
            localStream.init(() => {
              // Play the local video stream
              localStream.play('local-video');
              agoraClient.current.publish(localStream);
            });
  
            // Save the local stream in the state
            setRemoteStreams((prevStreams) => [...prevStreams, localStream]);
          },
      );
    });

    // Cleanup on component unmount
    return () => {
      // Leave the channel and destroy the Agora SDK instance
      agoraClient.current.leave(() => {
        console.log('Left channel');
        agoraClient.current = null;
      });
    };
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return <div>Your Highness, the video call component is initialized.</div>;
};

export default Agora;
