var pomelo = window.pomelo;
var LENGTH_ERROR = "Too long or too short m8";
var NAME_ERROR = "Dude, use a valid name. No special characters, a'ight?"
var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;

// INITIALIZERS
$(document).ready(function() {
	$("#login").click(function() {
		var username = $("#loginUser").attr("value");
		var rid = $("#channelList").val();
		console.log(username + "*" + rid);
		login(username, rid);
	});
});

// FRONT END CODE
function showLogin() {

}

function showError(str) {
	alert(str);
}


// CONNECTION CODE

// query connector
function queryEntry(uid, callback) {
	var route = 'gate.gateHandler.queryEntry';
	pomelo.init({
		host: window.location.hostname,
		port: 3014,
		log: true
	}, function() {
		pomelo.request(route, {
			uid: uid
		}, function(data) {
			pomelo.disconnect();
			if(data.code === 500) {
				alert(data.msg)
				return;
			}
			callback(data.host, data.port);
		});
	});
};

// rid is roomid, seriously, stupid name
function login(username, rid) {
	if(username.length > 20 || username.length == 0 || rid.length > 20 || rid.length == 0) {
		showError(LENGTH_ERROR);
		return false;
	}

	if(!reg.test(username) || !reg.test(rid)) {
		showError(NAME_ERROR);
		return false;
	}

	// get the data for connection
	queryEntry(username, function(host, port) {
		pomelo.init({
			host: host,
			port: port,
			log: true
		}, function() {
			var route =  "connector.entryHandler.entry";
			// now have correct host and port
			pomelo.request(route, {
				username: username,
				rid: rid
			}, function(data) {
				if(data.error) {
					showError(data.error);
					return;
				}

				// log in success! Time to do shit with data
				// uhhh, let's just log it, i dunno
				alert(JSON.stringify(data));
			});
		});
	});
}

// GAME CODE

function initGame(options) {
	// do shit
}

function initListeners() {

}

function updateGame(options) {

}