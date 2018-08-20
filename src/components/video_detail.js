import React from 'react';
import YouTube from 'react-youtube';

const videoDetail = ({video,onVideoEnd}) => {
  if(!video){
    return <div>loading...</div>
  }
  const videoId = video.id.videoId;
  const opts = {
    playerVars: {
      autoplay: 1
    }
  };
  return (
    <div className="video-detail col-md-7">
      <div className="embed-responsive embed-responsive-16by9">
        <YouTube videoId={videoId} opts={opts} onEnd={() => onVideoEnd()}/>
      </div>
      <div className="details">
        <div>{video.snippet.title}</div>
        <div>{video.snippet.description}</div>
        <button className="btn btn-warning" onClick={ () => onVideoEnd() }>next</button>
      </div>
    </div>
  )
};

export default videoDetail;