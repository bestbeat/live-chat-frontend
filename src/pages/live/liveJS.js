
    import '../../extend/adapter.js'
    



    function getMedia() {
        var getUserMedia = navigator.getUserMedia;
        getUserMedia({"audio":true,"video":true},gotUserMedia,didntGetUserMedia);
    }

    function gotUserMedia(stream) {
        var video = document.getElementById("video");
        window.stream = stream;
        console.log(window.URL);
        video.srcObject  = stream;
        video.play();
    }

    function didntGetUserMedia(){
        console.log("couldn't get video");
    }

    

    export {getMedia}

