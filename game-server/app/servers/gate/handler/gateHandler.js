module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

/**
 * Gate handler that dispatch user to connectors.
 *
 * @param {Object} msg message from client
 * @param {Object} session
 * @param {Function} next next stemp callback
 *
 */
Handler.prototype.queryEntry = function(msg, session, next) {
	var uid = msg.uid;	if(!uid) {
		next(null, {
			code: 500,
			msg: "No uid"
		});
		return;
	}
	// get all connectors
	var connectors = this.app.getServersByType('connector');
	if(!connectors || connectors.length === 0) {
		next(null, {
			code: 500,
			msg: "No connectors"
		});
		return;
	}
	// here we just start `ONE` connector server, so we return the connectors[0] 
	var res = connectors[0];
	next(null, {
		code: 200,
		host: res.host,
		port: res.clientPort
	});
};
