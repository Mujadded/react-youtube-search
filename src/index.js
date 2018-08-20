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
            queuedVideos: []
         };

         this.videoSearch('');
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
        queue.indexOf(video) === -1 ? queue.push(video) : console.log("This item already exists");
        this.setState({ queuedVideos: queue });
    }

    nextInQueue() {
        this.state.queuedVideos.shift();
        if(this.state.queuedVideos.length > 0){
            this.setState({ selectedVideo: this.state.queuedVideos[0] });
        }
    }
    
    playVideo(video){
        this.setState({
            selectedVideo: video,
            queuedVideos:[video],
        })
    }

   render(){ 
       const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
       
       return (
        <div>
            <SearchBar onSearchTermChange = {videoSearch} />
            <QueueList 
                selectedVideo = {this.state.selectedVideo}
                queuedVideos = {this.state.queuedVideos} />
            <VideoDetail
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