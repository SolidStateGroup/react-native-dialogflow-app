var dialogFlow = require('./dialog-flow');

var init = function (server) {
    io = require('socket.io')(server);
    io.on('connection', function (socket) {
        socket.on('history', function (data) {
            console.log(data.sessionId);

        });

        socket.on('message', function (data) {
            //client emitted message
            console.log(data.message, data.sessionId);
            dialogFlow.getRes(data.client, data.sessionId)
                .then(function (res) {
                    socket.emit('fromServer', {server: res});
                });
        });
    });
};

module.exports = {init};