import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import QueueList from './components/queue_list';
const API_KEY = 'AIzaSyDzrD_k4pgLe2SITQiC0RHYg9CD2w6DcT0'

class App extends Component {
    constructor(props){
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null,
            queuedVideos: [],
            repeatQueue: false,
            fileReader: new FileReader()
         };
        
        this.state.fileReader.onload = event => {this.onImport(event)};

        this.videoSearch('');
    }

    onImport(event) {
        let videos = JSON.parse(event.target.result.replace(/{#}/g, " "))
        videos = this.cleanQueue(videos);
        this.setState({ 
            queuedVideos: videos,
            selectedVideo: videos[0]
        });
    }

    videoSearch(term) {
        YTSearch({ key: API_KEY, term: term }, videos => {
            if (!this.state.selectedVideo){
                this.setState({ 
                    videos: videos,
                    selectedVideo: videos[0],
                    queuedVideos: [videos[0]]
                });
            }
            else {
                this.setState({ videos: videos });
            }

        });
    }

    addVideoinQueue(video){
        let queue = this.state.queuedVideos;
        if(video){
            let exists = false;
            _.forEach(queue,(currentVideo)=>{
                if (currentVideo.etag == video.etag){
                    exists = true;
                    return;
                }
            });
            console.log("Already in queue");
            if(!exists){
                queue.push(video) 
                this.setState({ queuedVideos: queue });
            }
        }
    }

    nextInQueue() {
        let queue = this.state.queuedVideos;
        let video = queue.shift();
        if(this.state.repeatQueue){
            queue.push(video);
        }
        if(queue.length > 0){
            this.setState({ 
                selectedVideo: queue[0],
                queuedVideos: queue 
            });
        }

    }
    
    playVideo(video, fromQueue = false){
        if (fromQueue) {
            let queue = this.state.queuedVideos;
            delete queue[queue.indexOf(video)];
            queue.unshift(video);
            this.setState({
                selectedVideo: queue[0],
                queuedVideos: queue
            });
        }
        else {  
            this.setState({
                selectedVideo: video,
                queuedVideos:[video]
            });
        }
    }

    exportCurrentQueue(){
        const dataUri = `data:application/json;charset=utf-8,${JSON.stringify(this.state.queuedVideos).replace(/\s/g, "{#}")}`;
        document.getElementById('link').href = dataUri;
    }

    toggleRepeat(){
        this.setState({
            repeatQueue: !this.state.repeatQueue
        });
    }

    shuffleQueue(){
        let queue = this.state.queuedVideos;
        queue=_.shuffle(queue)
        this.setState({
            queuedVideos: queue,
            selectedVideo:queue[0]
        });
    }

    cleanQueue(videos){
        videos = videos.filter((video)=>{
            if(video)
            {
                return true;
            }
            return false;
        });
        return videos;
    }

    deleteUndefinedVideos(){
        let queue = this.state.queuedVideos;
        queue = this.cleanQueue(queue);
        this.setState({ 
            queuedVideos: queue,
            selectedVideo: queue[0]
        });
    }

   render(){ 
       const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
       
       return (
        <div>
            <SearchBar onSearchTermChange = {videoSearch} />
            <QueueList 
                deleteUndefinedVideos = { ()=> this.deleteUndefinedVideos() }
                onVideoSelect={selectedVideo => this.playVideo(selectedVideo,true)}
                repeatQueue = {this.state.repeatQueue}
                onRepeatClick = {() => this.toggleRepeat() }
                onShuffleClick = {() => this.shuffleQueue() }
                selectedVideo = {this.state.selectedVideo}
                queuedVideos = {this.state.queuedVideos} 
                />
            <VideoDetail
                fileReader = {this.state.fileReader}
                onExportClick={() => this.exportCurrentQueue()}
                onVideoEnd={() => this.nextInQueue() }
                video={this.state.selectedVideo}/>
            <VideoList
                onClickAddVideo={ clickedVideo => this.addVideoinQueue(clickedVideo) }
                onVideoSelect={selectedVideo => this.playVideo(selectedVideo)} 
                videos={ this.state.videos }
            />
        </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container-fluid'));