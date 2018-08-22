import React from 'react';
import YouTube from 'react-youtube';
import VideoButtons from './video_buttons';

const VideoDetail = ({video,nextInQueue,onExportClick,fileReader}) => {
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
    <div className="video-detail col-sm-7">
      <div className="embed-responsive embed-responsive-16by9">
        <YouTube 
          videoId={videoId} 
          opts={opts} 
          onEnd={() => nextInQueue()}
          onError={() => console.log('on error while playing')}
          />
      </div>
      <div className="details">
        <div>{video.snippet.title}</div>
        <div>{video.snippet.description}</div>
      </div>
      <VideoButtons 
        nextInQueue = {() => nextInQueue() }
        onExportClick = { () => onExportClick() }
        fileReader = { fileReader }
      />
    </div>
  )
};

export default VideoDetail;