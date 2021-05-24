const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1080;

class PlayerCanvas{
    constructor(width,height,res){
        this._canvas = document.createElement("canvas");
        this._canvas.width = width;
        this._canvas.height = height;
        this._CANVAS_WIDTH = width;
        this._CANVAS_HEIGHT = height;
        this._CAMERA_VIDEO_WIDTH = 200;
        this._CAMERA_VIDEO_HEIGHT = 150;
        this._context2d = this._canvas.getContext("2d");
        this._resContext2d = res;
        requestAnimationFrame(this._animationFrameHandler.bind(this))
    }

    /**
     * 
     * @param {HTMLVideoElement} video 
     */
    setScreenVideo(video){
        this._screenVideo = video;
    }

    setCameraVideo(video){
        this._cameraVideo = video;
    }

    /**
     * 按屏幕刷新的频率不断执行这个函数
     */
    _animationFrameHandler(){
        if(this._screenVideo){
            this._context2d.drawImage(this._screenVideo,0,0,this._CANVAS_WIDTH,this._CANVAS_HEIGHT);
        }

        if(this._cameraVideo){
            this._context2d.drawImage(this._cameraVideo,
                this._CANVAS_WIDTH-this._CAMERA_VIDEO_WIDTH,
                this._CANVAS_HEIGHT-this._CAMERA_VIDEO_HEIGHT,
                this._CAMERA_VIDEO_WIDTH,this._CAMERA_VIDEO_HEIGHT);
        }

        let srcImageData = this._context2d.getImageData(0,0,this._CANVAS_WIDTH,this._CANVAS_HEIGHT);
        // console.log(srcImageData.width);
        let destImageData = this._resContext2d.createImageData(1920  ,1080);
        console.log(destImageData);
        let length = srcImageData.data.byteLength;
        let rowData = srcImageData.data;
        for (let i = 0; i < length; i+=4) {
            let c = Math.floor((rowData[i]+rowData[i+1]+rowData[i+2])/3)
            destImageData.data[i] = c;
            destImageData.data[i + 1] = c;
            destImageData.data[i + 2] = c;
            destImageData.data[i + 3] = 255;
        }

        // this._resContext2d.putImageData(destImageData,0,0);
        // this._resContext2d.drawImage(destImageData.data,this._CANVAS_WIDTH,this._CANVAS_HEIGHT);
        // requestAnimationFrame(this._animationFrameHandler.bind(this))
    }

    get canvas(){
        return this._canvas;
    }
}



new Vue({
    el:"#app",
    data:{
        currentWebmData:null,
        audio_isRecording:false,
        audio_isPaused:true,

        video_isRecording:false,
        video_isPaused:true,

    },
    mounted() {
        this._initVueApp();
        
        this.startRecording();
    },
    methods: {
        async _initVueApp(){
            
            this._playerCanvas = new PlayerCanvas(SCREEN_WIDTH,SCREEN_HEIGHT,this.$refs.canvas.getContext("2d"));
            this._stream = new MediaStream();
            // 录制audio
            this._audioStream = await navigator.mediaDevices.getUserMedia({video:false,audio:true });

            // 录制屏幕
            this._displayStream = await navigator.mediaDevices.getDisplayMedia();
            this._playerCanvas.setScreenVideo(this.createVideoElementWidthStream(this._displayStream))

            // 录制摄像头
            this._cameraStream = await navigator.mediaDevices.getUserMedia({video:true,audio:false });
            this._playerCanvas.setCameraVideo(this.createVideoElementWidthStream(this._cameraStream))

            //   合轨   把audio add to stream 
            this._audioStream.getAudioTracks().forEach(element => {
                this._stream.addTrack(element);
            });

            let playerCanvasStream = this._playerCanvas.canvas.captureStream()
            playerCanvasStream.getTracks().forEach(element => {
                this._stream.addTrack(element);
            });
            this.$refs.video.srcObject = playerCanvasStream ;

        },
        
        recorder_dataAvailableHandler(e){
            //data
            console.log(e); 
            var flag= confirm("是否保存")
            if(flag){
                this.currentWebmData = e.data;
            }
            
        },

        // 开始录制
        startRecording(){
            this._videoRecorder = new MediaRecorder(this._stream,{mimeType:"video/webm;codecs=h264"});
            
            // this._videoRecorder.ondataavailable = this.recorder_dataAvailableHandler.bind(this);
            this._videoRecorder.ondataavailable = async data =>{
                console.log(data); 
                var flag= confirm("是否保存")
                if(flag){
                    this.currentWebmData = data.data;
                }
                //  return path  保存用
            }
        },
        // 自动播放
        createVideoElementWidthStream(stream){
            let video = document.createElement("video");
            
            video.autoplay = true;
            video.srcObject = stream;
            return video;
        },
        audio_start(){
            // this._recorder.start(1000);   分片 以后合成
            this._recorder.start();
            this.audio_isRecording = true;
            this.audio_isPaused = false;
        },
        audio_pause(){
            this._recorder.pause();
            this.audio_isPaused = true;
        },
        audio_restart(){
            this._recorder.resume();
            this.audio_isPaused = false;
        },
        audio_stop(){
            this._recorder.stop();
            this.audio_isRecording = false;
        },
        audio_play(){
            if(this.currentWebmData==null){
                console.log("nothing");
                return;
            }
            this.$refs.audio.src = URL.createObjectURL(this.currentWebmData);
        },
        video_start(){
            // this._recorder.start(1000);   分片 以后合成
            this._videoRecorder.start();
            this.video_isRecording = true;
            this.video_isPaused = false;
        },
        video_pause(){
            this._videoRecorder.pause();
            this.video_isPaused = true;
        },
        video_restart(){
            this._videoRecorder.resume();
            this.video_isPaused = false;
        },
        video_stop(){
            this._videoRecorder.stop();
            this.video_isRecording = false;
        },
        video_play(){
            if(this.currentWebmData==null){
                console.log("nothing");
                return;
            }
            this.$refs.video2.src = URL.createObjectURL(this.currentWebmData);
        },
    },
})
