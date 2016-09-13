
var Teamspeak = require('node-teamspeak-api');
var config = require('config');
var info = config.get('info');

var tsClient = new Teamspeak(info.server, 10011);
var check = require('./checkip.js');

var options = ['away', 'times'];
var params = {
    client_login_name: info.username,
    client_login_password: info.password
};
tsClient.on('notify.cliententerview', function(eventName, resp) {
    var options = {
        clid: resp.clid
    }
    tsClient.send('clientinfo', params, options, function(err, resp, req) {
        var current_ip = resp.data.connection_client_ip,
            nickname = resp.data.client_nickname;
        new check(current_ip, tsClient, nickname);
    });
})
tsClient.api.login({
    client_login_name: info.username,
    client_login_password: info.password
}, function(err, resp, req) {
    tsClient.api.use({
        sid: 1
    }, function(err, resp, req) {
        tsClient.subscribe({
            event: 'server'
        })
    });
});