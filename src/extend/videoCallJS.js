
    import './adapter.js'
    import {signalingChannel} from './clientWebsocketSignaling.js'

var videoCall = {
 
        haveLocalMedia : false,
        weWaited : false,
        doNothing : function() {},
        constraints : {mandatory:{
            offerToReceiveAudio: true,
            offerToReceiveVideo: true
        }},

    // 获取本地媒体
    // 自动启动信令通道
    init : function (localEl,remoteEl,params) {
        this.queryparams = params;
        // 如果 URI 中提供了密钥，则自动连接信令通道
        if (this.queryparams && this.queryparams['key']) {
            console.log(this.queryparams['key']);
            this.key = this.queryparams['key'];
            // this.connect();
        }

        if (localEl) {
            this.localVideo = document.getElementById(localEl);
        }

        if (remoteEl) {
            this.remoteVideo = document.getElementById(remoteEl);
        }
        ;
        
        this.getMedia();

        // 如果建立连接，connect() 将调用 createPC()。
        // 如果 createPC() 和 getMedia() 成功执行，将调用 attachMedia()

    },

    // 建立信令通道
    connect : function () {
        var errorCB, scHandlers, handleMsg,openHandler;
       
        // 处理通过信令通道收到的所有消息。
        handleMsg = function (res) {
            var msg = JSON.parse(res.data);
            console.log(msg);

            

            if (msg.method === "offer") {
                this.pc.setRemoteDescription(new RTCSessionDescription(msg));
                answer();
            } else if (msg.method === "answer") {
                this.pc.setRemoteDescription(new RTCSessionDescription(msg));
            } else if (msg.method === "candidate") {
                this.pc.addIceCandidate(new RTCIceCandidate({sdpMLineIndex:msg.mlineindex,
                                                        candidate:msg.candidate}));
            } else if (msg.method === "register" ) {
                videoCall.signalingChannel.id = msg.id;
            } else if (msg.method === "connect" ) {
                videoCall.signalingChannel.status = msg.status;
                if (msg.status === "waiting") {
                    videoCall.signalingChannel.waitingHandler();
                    console.log(videoCall);
                } else {
                    videoCall.signalingChannel.connectedHandler();
                    console.log(videoCall);
                }
            }
        };

        openHandler = function () {
            console.log(videoCall.key);
            this.send(JSON.stringify({method:'connect',secretKey:videoCall.key}));
        };
        
        // 用于信令通道的处理
        scHandlers = {
            'onWaiting' : function () {
                videoCall.setStatus("Waiting");
                videoCall.weWaited = true;
            },
            'onConnected' : function () {
                videoCall.setStatus("Connected");
                videoCall.createPC();
            },
            'onMessage' : handleMsg,
            'onOpen' : openHandler
        }

        this.signalingChannel = signalingChannel;
        this.signalingChannel.create(scHandlers);
        errorCB = function (msg) {
            console.log(msg);
        };
        this.signalingChannel.connect(errorCB);

    },

    // 通过信令通道发送消息
    send : function (msg) {

        console.log(msg);

        this.signalingChannel.send(msg);
    },

    // 展示 video 流
    attachMediaStream : function (video,videoStream) {
        video.srcObject = videoStream
        video.play();
    },

    // 获取本地媒体
    getMedia : function () {
        var getUserMedia = navigator.getUserMedia;
        console.log(getUserMedia);
        getUserMedia({"audio":false,"video":true},this.gotUserMedia,this.didntGetUserMedia);
    },

    gotUserMedia : function (stream) {
        videoCall.localVideoStream = stream;
        videoCall.haveLocalMedia = true;

        videoCall.attachMediaStream(videoCall.localVideo,videoCall.localVideoStream);

        // 等待 RTCPeerConnection 创建完毕
        videoCall.attachMediaIfReady();

    },

    didntGetUserMedia : function (){
        console.log("couldn't get video");
    },

    // 建立RTC 对等连接
    createPC : function () {
        var stunuri = true,
            turnuri = false,
            isFalseValue = function(v) {
                return ((v==="0") || (v==="false") || (!v));
            }
            config = new Array();

        // 基于各个查询参数调整配置字符串
        if (this.queryparams) {
            if ('stunuri' in this.queryparams) {
                stunuri = !isFalseValue(this.queryparams['stunuri']);
            };
            if ('turnuri' in this.queryparams) {
                turnuri = !isFalseValue(this.queryparams['turnuri']);
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

        this.pc = new RTCPeerConnection({iceServers:config});
        this.pc.onicecandidate = this.onIceCandidate;
        
        this.pc.onaddstream = this.onRemoteStreamAdded;
        this.pc.onremovestream = this.onRemoteStreamRemoved;

        // 等待本地媒体准备就绪
        this.attachMediaIfReady();
    },
    
    // 如果存在另一个候选项，则将其发送给对等端
    onIceCandidate : function (e) {
        if (e.candidate) {
            send({type: 'candidate',mlineindex: e.candidate.sdpMLineIndex,candidate: e.candidate.candidate});
        }
    },

    // 如果另一端添加了媒体流，则将其显示在屏幕上
    onRemoteStreamAdded : function (e) {
        this.remoteVideoStream = e.stream;
        attachMediaStream(this.remoteVideo,this.remoteVideoStream);
        setStatus("On Call");
    },

    // 远程端移除流操作
    onRemoteStreamRemoved : function (e) {

    },

    // 此守护例程实际上用于对两项异步活动的完成时间进行同步：
    // 一是创建对等连接；二是获取本地媒体
    attachMediaIfReady : function () {
        // 如果 RTCPeerConnection 已经就绪，
        // 并且我们已获得本地媒体，则继续处理。
        if (this.pc && this.haveLocalMedia ) {
            this.attachMedia();
        }
    },

    // 此例程将我们的本地媒体流添加至对等连接
    // 请注意，这不会导致任何媒体开始流动
    // 其作用只是指示浏览器在旗下一个SDP 描述中加入此流
    attachMedia : function () {
        this.pc.addStream(this.localVideoStream);
        setStatus("Ready for call");

        // 如果 URI 中 call 参数的值表示 true,则自动执行调用，
        // 但还要确保我们已完成连接之前的所有步骤（提高两端已一切就绪的概率）
        if (this.queryparams && this.queryparams['call'] && !this.weWaited) {
            this.call();
        }
    },

    // 呼叫-为提议生成会话描述
    call : function () {
        this.pc.createOffer(gotDescription,doNothing,constraints);
    },

    // 应答-为应答生成会话描述
    answer : function () {
        this.pc.createAnswer(gotDescription,doNothing,constraints);
    },

    // 获取会话描述
    // 将其用作本地描述
    // 发送给另一端的浏览器
    // 只有先设置了本地描述，才能发送媒体，并接受另一端媒体
    gotDescription : function (localDesc) {
        this.pc.setLocalDescription(localDesc);
        this.send(this.localDesc);
    },

    // 此函数将通过隐藏、显示和填充各种 UI 元素，
    // 让用户大体了解浏览器在建立信令通道、
    // 获取本地媒体、创建对等连接
    // 以及实际连接媒体（呼叫）方面的进度。
    setStatus :function (str) {
        
    }

}

export {videoCall}

