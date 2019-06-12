
    import '../../extend/adapter.js'
    import '../../extend/clientWebsocketSignaling.js'
    
    var signalingChannel,key,id,
        haveLocalMedia = false,
        weWaited = false,
        localVideoStream,localVideo,
        remoteVideoStream,remoteVideo,
        doNothing = function() {},
        pc,
        constraints = {mandatory:{
            offerToReceiveAudio: true,
            offerToReceiveVideo: true
        }};

    // 获取本地媒体
    // 自动启动信令通道
    function mediaInit(localEl,remoteEl) {

        // 如果 URI 中提供了密钥，则自动连接信令通道
        if (queryparams && queryparams['key']) {
            console.log(queryparams['key']);
            key = queryparams['key'];
            connect();
        }

        if (localEl) {
            localVideo = document.getElementById(localEl);
        }

        if (remoteEl) {
            remoteVideo = document.getElementById(remoteEl);
        }

        getMedia();

        // 如果建立连接，connect() 将调用 createPC()。
        // 如果 createPC() 和 getMedia() 成功执行，将调用 attachMedia()

    }

    // 建立信令通道
    function connect() {
        var errorCB, scHandlers, handleMsg;

        // 处理通过信令通道收到的所有消息。
        handleMsg = function (msg) {
            console.log(msg);

            if (msg.type === "offer") {
                pc.setRemoteDescription(new RTCSessionDescription(msg));
                answer();
            } else if (msg.type === "answer") {
                pc.setRemoteDescription(new RTCSessionDescription(msg));
            } else if (msg.type === "candidate") {
                pc.addIceCandidate(new RTCIceCandidate({sdpMLineIndex:msg.mlineindex,
                                                        candidate:msg.candidate}));
            }
        };

        // 用于信令通道的处理
        scHandlers = {
            'onWaiting' : function () {
                setStatus("Waiting");
                weWaited = true;
            },
            'onConnected' : function () {
                setStatus("Connected");
                createPC();
            },
            'onMessage' : handleMsg
        };

        signalingChannel = createSignalingChannel(scHandlers);
        errorCB = function (msg) {
            console.log(msg);
        }
        signalingChannel.connect(errorCB);

    }

    // 通过信令通道发送消息
    function send(msg) {

        console.log(msg);

        signalingChannel.send(msg);
    }

    // 展示 video 流
    function attachMediaStream(video,videoStream) {
        video.srcObject = videoStream
    }

    // 获取本地媒体
    function getMedia() {
        var getUserMedia = navigator.getUserMedia;
        getUserMedia({"audio":false,"video":true},gotUserMedia,didntGetUserMedia);
    }

    function gotUserMedia(stream) {
        localVideoStream = stream;
        haveLocalMedia = true;

        attachMediaStream(localVideo,localVideoStream);

        // 等待 RTCPeerConnection 创建完毕
        attachMediaIfReady();

        // var pc = new RTCPeerConnection({
        //     iceServers:[{"url":"stun:stun.l.google.com:19302"},
        //                 {"url":"turn:118.31.110.11:3478","username":"zqq","credential":"test"}]   
        // });
        // pc.addStream(stream);
        // video.play();
    }

    function didntGetUserMedia(){
        console.log("couldn't get video");
    }

    // 建立RTC 对等连接
    function createPC() {
        var stunuri = true,
            turnuri = false,
            isFalseValue = function(v) {
                return ((v==="0") || (v==="false") || (!v));
            }
            config = new Array();

        // 基于各个查询参数调整配置字符串
        if (queryparams) {
            if ('stunuri' in queryparams) {
                stunuri = !isFalseValue(queryparams['stunuri']);
            };
            if ('turnuri' in queryparams) {
                turnuri = !isFalseValue(queryparams['turnuri']);
            };
        };

        if (stunuri) {
            // google 的一台公共stun服务器
            config.push({"url":"stun:stun.l.google.com:19302"});
           
        }
        if (turnuri) {
            if (stunuri) {
                // 这里不能使用仅支持 TRUN 的 TURN 服务器，因为 Chrome 中的存在一个BUG,
                // 可导致 STUN 服务器的响应遭到忽略，
                // 因此我们使用同时具备 STUN 功能的 TURN 服务器
                config.push({"url":"turn:118.31.110.11:3478","username":"zqq","credential":"test"});

            } else {
                // 仅支持 TRUN 的 TURN 服务器
                config.push({"url":"turn:118.31.110.11:3478","username":"zqq","credential":"test"});

            }
        }

        console.log("config = " + JSON.stringify(config));

        pc = new RTCPeerConnection({iceServers:config});
        pc.onicecandidate = onIceCandidate;
        
        pc.onaddstream = onRemoteStreamAdded;
        pc.onremovestream = onRemoteStreamRemoved;

        // 等待本地媒体准备就绪
        attachMediaIfReady();
    }
    

    export {getMedia}

