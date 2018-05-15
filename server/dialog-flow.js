var apiai = require('apiai');
var app = apiai(require("../common/project").dialogFlow);
// Function which returns speech from api.ai
var getRes = function (query, sessionId) {
    var request = app.textRequest(query, {
        sessionId
    });

    const responseFromAPI = new Promise(
        function (resolve, reject) {
            request.on('error', function (error) {
                reject(error);
            });
            request.on('response', function (response) {
                resolve(response.result.fulfillment.speech);
            });
        });

    request.end();
    return responseFromAPI;

};

module.exports = {getRes}