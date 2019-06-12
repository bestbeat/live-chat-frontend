var createSignalingChannel = function(handlers) {
    var id,status,doNothing = function() {},
        handlers = handlers || {},
        initHandler = function(h) {
            return ((typeof h === 'function') && h) || doNothing;
        },
        // waitingHandler = initHandler(handlers.onWaiting),
        // connectedHandler = initHandler(handlers.onConnected),
        messageHandler = initHandler(handlers.onMessage);

    var webSocket;
    
    function connect(failureCB){

        if ('WebSocket' in window) {
            webSocket = new WebSocket('ws://localhost:8080/signaling');
            console.info(webSocket);
        } else {
            alert(' 该浏览器不支持 WebSocket ');
        }

        var failureCB = (typeof failureCB === 'function') || function() {};
        //连接发生错误的回调方法
        webSocket.onerror = failureCB;
        //连接成功建立的回调方法
        webSocket.onopen = function() {
            console.info("连接建立");
        }
        //接收到消息的回调方法
        webSocket.onmessage = function(msg) {
            messageHandler(msg);
        };
        //连接关闭的回调方法
        webSocket.onclose = function() {
            webSocket.close();
        }
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function() {
            webSocket.close();
        }

    }

    //关闭连接
    function closeWebSocket() {
        webSocket.close();
    }

    // 通过信令通道向另一端的浏览器发送消息
    function send(msg) {
        webSocket.send(msg);
    }

    return {
        connect: connect,
        send: send,
        close: closeWebSocket
    };
};