
    import './adapter.js'
    import {signalingChannel} from './clientWebsocketSignaling.js'
import { cpus } from 'os';

const videoChat = {

    config: {
      mediaConstraints : {
        audio: false,
        video: true
      }
    },  

    pc: {},

    remoteVideos: {},

    // 获取本地媒体
    // 自动启动信令通道
    init : function (remoteIndex,params) {
        videoChat.params = params;
        // 如果 URI 中提供了密钥，则自动连接信令通道
        if (videoChat.params && videoChat.params['roomId']) {
            console.log('roomId: '+videoChat.params['roomId']);
            videoChat.roomId = videoChat.params['roomId'];
            videoChat.start();
        }

        var i = 0;
        while (i < remoteIndex) {
          videoChat.remoteVideos[('remoteVideo'+i)]='no-play';
          i = i + 1;
        }
        // console.log( JSON.stringify(videoChat.remoteVideos));

    },

    getMedia: function(remote_uuid){

        var handleGetUserMediaError = function(e) {
            switch(e.name) {
              case "NotFoundError":
                console.log("Unable to open your call because no camera and/or microphone were found.");
                break;
              case "SecurityError":
              case "PermissionDeniedError":
                break;
              default:
                console.log("Error opening your camera and/or microphone: " + e.message);
                break;
            }
          
            videoChat.closevideoChat(remote_uuid);
        }

        videoChat.createPC(remote_uuid);
        navigator.mediaDevices.getUserMedia(videoChat.config.mediaConstraints)
        .then(function(localStream) {
            localStream.getTracks().forEach(track => videoChat.pc[remote_uuid].addTrack(track, localStream));
        })
        .catch(handleGetUserMediaError);
    },

    closevideoChat: function(remote_uuid) {

        console.log("video close " + remote_uuid);
        if (videoChat.pc[remote_uuid]) {
          videoChat.pc[remote_uuid].ontrack = null;
          videoChat.pc[remote_uuid].onremovetrack = null;
          videoChat.pc[remote_uuid].onremovestream = null;
          videoChat.pc[remote_uuid].onicecandidate = null;
          videoChat.pc[remote_uuid].oniceconnectionstatechange = null;
          videoChat.pc[remote_uuid].onsignalingstatechange = null;
          videoChat.pc[remote_uuid].onicegatheringstatechange = null;
          videoChat.pc[remote_uuid].onnegotiationneeded = null;
      
          if (videoChat.remoteVideos[remote_uuid]) {
            var remoteVideo =videoChat.remoteVideos[remote_uuid];
            videoChat.remoteVideos[remoteVideo.id] = "no-play";
            // console.log(JSON.stringify(videoChat.remoteVideos));
            remoteVideo.srcObject.getTracks().forEach(track => track.stop());
            remoteVideo.removeAttribute("src");
            remoteVideo.removeAttribute("srcObject");
            delete videoChat.remoteVideos[remote_uuid];
            // console.log(JSON.stringify(videoChat.remoteVideos));
          }
      
          videoChat.pc[remote_uuid].close();
          videoChat.pc[remote_uuid] = null;
          delete videoChat.pc[remote_uuid];
        }

    },
        
    // 建立信令通道
    start : function () {

        var waitingHandler = function() {

        },

        connectedHandler = function() {

        },
       
        // 处理通过信令通道收到的所有消息。
        msgHandler = function (res) {
            var msg = JSON.parse(res.data);
            console.log("msgHandler: "+JSON.stringify(msg));            

            if (videoChat.uuid && videoChat.uuid != msg.from) {
              if (msg.type === "WEBRTC_OFFER") {
                videoChat.handleVideoOfferMsg(msg);
              } else if (msg.type === "WEBRTC_ANSWER") {
                var desc = new RTCSessionDescription(msg.content);
                videoChat.pc[msg.from].setRemoteDescription(desc);
              } else if (msg.type === "WEBRTC_ICE" ) {
                console.log(JSON.stringify(msg));
                videoChat.handleNewICECandidateMsg(msg);
              } else if (msg.type === "SIGNALING_CONNECT") {

                videoChat.getMedia(msg.from);

              }
            } else {
              if (msg.type === "SIGNALING_CONNECT") {
                videoChat.uuid = msg.from;
              } 
            }
            
        },

        openHandler = function (res) {
            console.log(JSON.stringify(res));
            // 发送心跳包，保持连接活跃
            videoChat.heartbeat = setInterval(() => {
                                    videoChat.send({
                                      data:JSON.stringify({
                                        type: "HEART_BEAT",
                                        from: videoChat.uuid,
                                        to: "server",
                                        roomId: videoChat.roomId,
                                        content: "package heartBeat"
                                      })
                                    });
                                  }, 10000);

        },

        errorHandler =  function(errMsg) {
          console.log(errMsg);
        },

        closeHandler = function(res) {
          console.log(JSON.stringify(res));
        },

        // 用于信令通道的处理
        scHandlers = {
            onWaiting : waitingHandler,
            onConnected : connectedHandler,
            onMessage : msgHandler,
            onOpen : openHandler,
            onError: errorHandler,
            onClose: closeHandler
        }

        // 信道初始化
        signalingChannel.init(scHandlers);
        // 信道连接
        signalingChannel.connect(videoChat.roomId);

    },

    // 通过信令通道发送消息
    send : function (msg) {

        // console.log(msg);

        signalingChannel.send(msg);
    },

    handleVideoOfferMsg: function (msg) {

        var remote_uuid = msg.from;

        function handleGetUserMediaError(e) {
            switch(e.name) {
              case "NotFoundError":
                console.log("Unable to open your call because no camera and/or microphone were found.");
                break;
              case "SecurityError":
              case "PermissionDeniedError":
                break;
              default:
                alert("Error opening your camera and/or microphone: " + e.message);
                break;
            }
          
            videoChat.closevideoChat(remote_uuid);
        }

        var localStream = null;
        
        videoChat.createPC(remote_uuid);
      
        console.log("handleVideoOfferMsg: "+JSON.stringify(msg));
        var desc = new RTCSessionDescription(msg.content);
      
        videoChat.pc[remote_uuid].setRemoteDescription(desc).then(function () {
          return navigator.mediaDevices.getUserMedia(videoChat.config.mediaConstraints);
        })
        .then(function(stream) {

          localStream = stream;
          // console.log(localStream);
          // videoChat.localVideo.srcObject = localStream;
      
          localStream.getTracks().forEach(track => videoChat.pc[remote_uuid].addTrack(track, localStream));
        })
        .then(function() {
          return videoChat.pc[remote_uuid].createAnswer();
        })
        .then(function(answer) {
            console.log(answer);
          return videoChat.pc[remote_uuid].setLocalDescription(answer);
        })
        .then(function() {
          var msg = {

            data: JSON.stringify({
              type: "WEBRTC_ANSWER",
              from: videoChat.uuid,
              to: remote_uuid,
              roomId: videoChat.roomId,
              content: videoChat.pc[remote_uuid].localDescription
            })
          };
      
          videoChat.send(msg);
        })
        .catch(handleGetUserMediaError);
    },

    handleNewICECandidateMsg: function (msg) {
      console.log("handleNewICECandidateMsg: "+JSON.stringify(msg));
      var candidate = new RTCIceCandidate(msg.content);
    
      videoChat.pc[msg.from].addIceCandidate(candidate)
        .catch(videoChat.reportError);
    },

    // 建立RTC 对等连接
    createPC : function (remote_uuid) {
        var stunuri = true,
            turnuri = true,
            isFalseValue = function(v) {
                return ((v==="0") || (v==="false") || (!v));
            },
            config = new Array();

        // 基于各个查询参数调整配置字符串
        if (videoChat.queryparams) {
            if ('stunuri' in videoChat.queryparams) {
                stunuri = !isFalseValue(videoChat.queryparams['stunuri']);
            };
            if ('turnuri' in videoChat.queryparams) {
                turnuri = !isFalseValue(videoChat.queryparams['turnuri']);
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

        function handleNegotiationNeededEvent() {
            // console.log("handleNegotiationNeededEvent: " + remote_uuid);
            videoChat.pc[remote_uuid].createOffer().then(function(offer) {
                return videoChat.pc[remote_uuid].setLocalDescription(offer);
              })
              .then(function() {
                videoChat.send({
                  data: JSON.stringify({
                    type: 'WEBRTC_OFFER',
                    from: videoChat.uuid,
                    to: remote_uuid,
                    roomId: videoChat.roomId,
                    content: videoChat.pc[remote_uuid].localDescription
                  })
                });
              })
              .catch(videoChat.reportError);
        }

        function handleICECandidateEvent(event) {
            if (event.candidate) {
              videoChat.send({
                data: JSON.stringify({
                  type: 'WEBRTC_ICE',
                  from: videoChat.uuid,
                  to: remote_uuid,
                  roomId: videoChat.roomId,
                  content: event.candidate
                })
              });
              
            }
        }

        

        function handleTrackEvent(event) {

          var remoteVideo = videoChat.remoteVideos[remote_uuid];

          if (remoteVideo) {
            remoteVideo.srcObject = event.streams[0];
          } else {
            for (var key in videoChat.remoteVideos) {
              // console.log(key);
              var remoteVideo = videoChat.remoteVideos[key];
              if (remoteVideo === "no-play") {
                remoteVideo = document.getElementById(key);
                videoChat.remoteVideos[remote_uuid] = remoteVideo;
                remoteVideo.srcObject = event.streams[0];
                videoChat.remoteVideos[key] = "play";
                break;
              } 
            }
          }
        }

        function handleRemoveTrackEvent(event) {
            console.log("handleRemoveTrackEvent");
            var stream = videoChat.remoteVideos[remote_uuid] .srcObject;
            var trackList = stream.getTracks();
           
            if (trackList.length == 0) {
                videoChat.closevideoChat(remote_uuid);
            }
        }

        function handleICEConnectionStateChangeEvent(event) {
            switch(videoChat.pc[remote_uuid].iceConnectionState) {
              case "closed":
              case "failed":
              case "disconnected":
              videoChat.closevideoChat(remote_uuid);
                break;
            }
        }

        function handleSignalingStateChangeEvent(event) {
            switch(videoChat.pc[remote_uuid].signalingState) {
              case "closed":
              videoChat.closevideoChat(remote_uuid);
                break;
            }
        }

        function handleICEGatheringStateChangeEvent(event) {
            // Our sample just logs information to console here,
            // but you can do whatever you need.
        }

        videoChat.pc[remote_uuid] = new RTCPeerConnection({iceServers:config});
        videoChat.pc[remote_uuid].onicecandidate = handleICECandidateEvent;
        videoChat.pc[remote_uuid].ontrack = handleTrackEvent;
        videoChat.pc[remote_uuid].onnegotiationneeded = handleNegotiationNeededEvent;
        videoChat.pc[remote_uuid].onremovetrack = handleRemoveTrackEvent;
        videoChat.pc[remote_uuid].oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
        videoChat.pc[remote_uuid].onicegatheringstatechange = handleICEGatheringStateChangeEvent;
        videoChat.pc[remote_uuid].onsignalingstatechange = handleSignalingStateChangeEvent;
    },
    
    reportError: function(e) {
      console.log("reportError: " + e);
    },
   
    close : function(){
      for (var remote_uuid in videoChat.pc) {
        videoChat.closevideoChat(remote_uuid);

      }
      signalingChannel.close();
      clearInterval(videoChat.heartbeat);
    }
   

}

export {videoChat}

