import React, { useEffect, useRef, useState } from 'react';

function VideoCallComponent(){
  const [incall, setInCall] = useState(false);

  return(
    <div className="">
    { incall ? "We are in call" : "waiting to join call"}
    </div>
  )

}


export default VideoCallComponent;
