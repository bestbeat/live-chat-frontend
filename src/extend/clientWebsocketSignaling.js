const signalingChannel = {
    
    id : '',
    status : '',

    doNothing : function() {},   

    create : function(handlers) {

        function initHandler (h) {
            return ((typeof h === 'function') && h) || this.doNothing;
        };

        handlers  = handlers || {};
        
        signalingChannel.waitingHandler = initHandler(handlers.onWaiting),
        signalingChannel.connectedHandler = initHandler(handlers.onConnected),
        signalingChannel.messageHandler = initHandler(handlers.onMessage),
        signalingChannel.openHandler = initHandler(handlers.onOpen);
        console.log(signalingChannel);
    },

    connect : function (failureCB){

        if ('WebSocket' in window) {
            this.webSocket = new WebSocket('wss://192.168.199.230:8080/signaling');
            console.info(this.webSocket);
        } else {
            alert(' 该浏览器不支持 WebSocket ');
        }

        var failureCB = (typeof failureCB === 'function') || function() {};
        //连接发生错误的回调方法
        this.webSocket.onerror = failureCB;
        //连接成功建立的回调方法
        this.webSocket.onopen = function() {
            signalingChannel.openHandler();
        }
        //接收到消息的回调方法
        this.webSocket.onmessage = function(msg) {
            signalingChannel.messageHandler(msg);
        };
        //连接关闭的回调方法
        this.webSocket.onclose = function() {
            this.webSocket.close();
        }
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function() {
            this.webSocket.close();
        }

    },

    //关闭连接
    closeWebSocket : function () {
        this.webSocket.close();
    },

    // 通过信令通道向另一端的浏览器发送消息
    send : function (msg) {
        this.webSocket.send(msg);
    }
};

export {signalingChannel}