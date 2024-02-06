import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk';
import Agora from '../Utils/agora';

const VideoCallComponent = () => {
  const agoraClient = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [remoteStreams, setRemoteStreams] = useState([]);

  useEffect(() => {
    Agora(agoraClient, setRemoteStreams);

    return () => {
      agoraClient.current.leave(() => {
        console.log('Left channel');
        agoraClient.current = null;
      });
    };
  }, []);

  
  const toggleMute = () => {
    try {
      agoraClient.current[isMuted ? 'unmute' : 'muteAudio']();
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };
  
  const toggleVideo = () => {
    try {
      agoraClient.current[isVideoEnabled ? 'enableVideo' : 'disableVideo']();
      setIsVideoEnabled(!isVideoEnabled);
    } catch (error) {
      console.error('Error toggling video:', error);
    }
  };
  
  const leaveCall = () => {
    try {
      agoraClient.current.leave(() => {
        console.log('Left channel');
        agoraClient.current = null;
      });
    } catch (error) {
      console.error('Error leaving call:', error);
    }
  };
  

  return (
    <div>
      <div>Your Highness, the video call component is initialized.</div>
      <div>
        <button onClick={toggleMute}>
          {isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
        </button>
        <button onClick={toggleVideo}>
          {isVideoEnabled ? 'Disable Video' : 'Enable Video'}
        </button>
        <button onClick={leaveCall}>Leave Call</button>
      </div>

      <div>
        {/* Render local video stream */}
        <div>Your Highness, your video stream:</div>
        <div>
          <video id="local-video" autoPlay playsInline />
        </div>
      </div>

      <div>
        {/* Render remote video streams */}
        <div>Your Highness, remote participants' video streams:</div>
        {remoteStreams.map((stream) => (
          <div key={stream.getId()}>
            <video
              ref={(ref) => {
                if (ref) {
                  stream.play(ref);
                }
              }}
              autoPlay
              playsInline
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCallComponent;
