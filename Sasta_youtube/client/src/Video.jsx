import React, { useRef, useState } from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId }) => {
    const playerRef = useRef(null);
    const [status, setStatus] = useState("Loading...");
    const[refreshcount , setRefreshCount] = useState(0);

    const maxrefreshes = 3
    const avgAddDuration=15
    // Options for the player
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1, // Auto-play when loaded
            controls: 1, // Show pause/play buttons
        },
    };

    // 1. Hook into the "State Change" event
    // This fires whenever the player goes from Playing -> Paused -> Buffering
    const onPlayerStateChange = (event) => {
        const player = event.target;
        const currentDuration = player.getDuration(); 
        
        if ((refreshcount<maxrefreshes) ){
            console.log("🚨 SUSPICIOUS: Duration is only " + currentDuration + "s. Might be an ad!");
            setStatus("Ad Detected? Refreshing...");
            setRefreshCount(prev => prev+1);
        }
        setStatus("Playing Main Content");    
    };

    const onReady = (event) => {
        playerRef.current = event.target;
        console.log("Player is ready!");
    };

    return (
        <div>
            <h2>Status: {status}</h2>
            
            {/* The Official Player */}
            <YouTube 
                videoId={videoId} 
                opts={opts} 
                onReady={onReady}
                onStateChange={onPlayerStateChange} 
            />
        </div>
    );
};

export default VideoPlayer;