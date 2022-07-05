import React from 'react';
import {
    AgoraVideoPlayer,
    createClient,
    createMicrophoneAndCameraTracks,
  } from "agora-rtc-react";

const Videos = ({users, tracks}) => {
    
    return (
      <div>
        <div id="videos">
          <AgoraVideoPlayer className='vid' videoTrack={tracks[1]} />
          {users.length > 0 &&
            users.map((user) => {
              if (user.videoTrack) {
                return (
                  <AgoraVideoPlayer className='vid' videoTrack={user.videoTrack} key={user.uid} />
                );
              } else return null;
            })}
        </div>
      </div>
    );
  };

  export default Videos;