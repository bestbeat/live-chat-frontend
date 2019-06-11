
    
    function gotUserMedia(stream) {
        myVideoStream = stream;

        // attachMediaStream(myVideo,myVideoStream);
    }

    function didntGetUserMedia(){
        console.log("couldn't get video");
    }
    
    function getMedia() {
        console.log(1);
        var getUserMedia = navigator.getUserMedia;
        console.log(getUserMedia);
        getUserMedia({"audio":true,"video":true},function(){

        },function(){

        });
    }

    

    export {getMedia}

