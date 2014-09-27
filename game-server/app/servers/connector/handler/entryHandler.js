module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

/**
 * New client entry.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.entry = function(msg, session, next) {
	var self = this;
	var rid = msg.rid;
	var uid = msg.username + "*" + rid;
	var sessionService = this.app.get('sessionService');

	if(!!sessionService.getByUid(uid)) {
		next(null, {
			code: 500,
			error: "Duplicate user"
		});
		return;
	}

	session.bind(uid);
	session.set('rid', rid); //I have no idea what the fuck this does
	session.push('rid', function(err) {
		if(err) {
			console.error("Setting rid failed, bro. wat do");
		}
	})

	session.on('closed', onUserLeave.bind(null, self.app));

	next(null, {code: 200, msg: JSON.stringify(msg)});

  // next to return current room state
};

var onUserLeave = function(app, session) {
	if(!session || !session.uid) {
		return;
	}

	// do shit with cleaning user
}

/**
 * Publish route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.publish = function(msg, session, next) {
	var result = {
		topic: 'publish',
		payload: JSON.stringify({code: 200, msg: 'publish message is ok.'})
	};
  next(null, result);
};

/**
 * Subscribe route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.subscribe = function(msg, session, next) {
	var result = {
		topic: 'subscribe',
		payload: JSON.stringify({code: 200, msg: 'subscribe message is ok.'})
	};
  next(null, result);
};
