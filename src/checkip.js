
var request = require('request');

function checkClient(ip, tsClient, name) {
    request('http://legacy.iphub.info/api.php?ip='+ip+'&showtype=4', function(err, resp, req) {
        var proxy = JSON.parse(resp.body).proxy;
        var options = {
            sgid: 10
        }
        if (proxy) {
            console.log("proxy");
            tsClient.send('servergroupclientlist', options, function (err, resp, req) {
                var list = resp.data;
                for (var i = 0; i < list.length; i++) {
                    var uid = list[i].cldbid;
                    tsClient.send('clientlist', function (err, resp, req) {
                        var clientList = resp.data;
                        var messagesent = 0;
                        for (var j = 0; j < clientList.length; j++) {
                            if (clientList[j].client_database_id == uid) {

                                var options = {
                                    targetmode: 1,
                                    target: clientList[j].clid,
                                    msg: name + " might be using a vpn.  Please investigate!"
                                }
                                if (messagesent == 0) {
                                    tsClient.send('sendtextmessage', options, function (err, resp, req) {
                                        messagesent++;
                                        console.log(req);
                                        console.log(resp);
                                    });
                                }
                            }
                        }
                    })
                }
            });
        }
    });
}


module.exports = checkClient;