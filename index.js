const https = require('https')

var options = {}
var request = null;

/**
 * Provides integer of remaining account credit
 * @param  {array} credentials An array containing company, username and password
 * @return {integer}             Returns a number equal or greater than 0. Will return -1 if there is an error
 */
module.exports.checkAccountCredit = function(credentials, callback) {
	options = {
		hostname: 'sms-speedway.com',
		path: '/account_balance.php?company=' + credentials['company'] + '&login=' + credentials['username'] + '&password=' + credentials['password'],
		method: 'GET'
	}

	request = https.request(options, function(res) {
		if(res.statusCode == 200) {
			res.on('data', function(d) {
				var r = String(d)
				if(r.toLowerCase().indexOf('error') != -1) {
					request.end()
					return callback(true, -1);
				}
				request.end()
				return callback(null, parseInt(r))
			})
		}
		
		
		request.on('error', function(error) {
			request.end()
			return callback(true, -1);
		})
	})
	request.end()
}

module.exports.sendSMS = function(number, message, credentials, sendAt = '', replyEmail = '', callback) {
	callback = callback || function(){}; // Initialising Callback As A Function For ASync
	options = {
		hostname: 'sms-speedway.com',
		path: '/queue_sms.php?company=' + credentials['company'] + '&login=' + credentials['username'] + '&password=' + credentials['password'] + '&plain_text=true' + '&numbers=' + number + '&message=' +  encodeURI(message),
		method: 'GET'
	}

	request = https.request(options, function(res) {
		if(res.statusCode == 200) {
			res.on('data', function(d) {
				var r = String(d)
				console.log(r)
				if(r.toLowerCase().indexOf('failure') != -1) {
					request.end()
					return callback(null, r)
				}
				request.end()
				return callback(null, r)
			})
		}
		
		
		request.on('error', function(error) {
			request.end()
			return callback(true, error)
		})
	})
	request.end()
}

