import Taro from '@tarojs/taro'

const signalingChannel = {
    

    init : function(handlers) {

        function doNothing(){}; 

        function initHandler (h) {
            return ((typeof h === 'function') && h) || doNothing;
        };

        handlers  = handlers || {};
        
        signalingChannel.waitingHandler = initHandler(handlers.onWaiting),
        signalingChannel.connectedHandler = initHandler(handlers.onConnected),

        signalingChannel.messageHandler = initHandler(handlers.onMessage),
        signalingChannel.openHandler = initHandler(handlers.onOpen),
        signalingChannel.errorHandler = initHandler(handlers.onError),
        signalingChannel.closeHandler = initHandler(handlers.onClose);
    },

    connect : function (roomId){

        Taro.connectSocket({
            url: process.env.SIGNALING_URL+"/"+roomId,
            success: function () {
              console.log('connect success')
            },
            fail : function (e) {
                console.log(e)
            },
            complete : function() {
                console.log("connect requset send")
            }
            
          }).then(task => {
                signalingChannel.task = task;
                signalingChannel.task.onOpen(signalingChannel.openHandler);
                signalingChannel.task.onMessage(function (msg) {
                    signalingChannel.messageHandler(msg);
                });
                signalingChannel.task.onError(signalingChannel.errorHandler);
                signalingChannel.task.onClose(signalingChannel.closeHandler);
          });
    },

    //关闭连接
    close : function () {
        signalingChannel.task.close({
            code: 1000,
            reason: "common close",
            success: function() {
                console.log("close success")
            },
            fail: function(e) {
                console.log(e)
            },
            complete: function() {
                console.log("close request send")
            }
        });
    },

    // 通过信令通道发送消息
    send : function (msg) {
        signalingChannel.task.send(msg);
    }
};

export {signalingChannel}