import React from 'react';
import YouTube from 'react-youtube';
import Files from "react-files";

const VideoDetail = ({video,onVideoEnd,onExportClick,fileReader}) => {
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
      </div>
      <div class="video-buttons">
        <button className="btn col-md-3" onClick={ () => onVideoEnd() }> Play next in queue </button>
        <a className="btn btn-primary col-md-3" id="link" download="queue.json" onClick={ () => onExportClick() }> Export queue </a>
        <div className="files btn btn-warning col-md-3">
          <Files
            className="files-dropzone"
            onChange={file => {
              fileReader.readAsText(file[0]);
            }}
            onError={err => console.log(err)}
            accepts={[".json"]}
            multiple={false}
            clickable >
            Import queue
          </Files>
        </div>
      </div>
    </div>
  )
};

export default VideoDetail;