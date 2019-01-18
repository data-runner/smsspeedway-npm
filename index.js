module.checkAccountCredit = function(credentials) {
	var url = 'https://push.sms-speedway.com/account_balance.php?company=' + credentials['company'] + '&login=' + credentials['username'] + '&password=' + credentials['password'];
	const Http = new XMLHttpRequest();
	Http.open("GET", url);
	Http.send();
	Http.onreadystatechange=(e)=> {
		return Http.responseText;
	}
}