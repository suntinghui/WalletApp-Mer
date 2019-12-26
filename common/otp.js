const CryptoJS = require('./crypto-js-sha1.js') // 需要CryptoJS

// ==================================================================================
var HOTP = function(secret, window, counter) {
	this.secret = secret || "123456";
	this.window = window || 3;
	this.counter = counter || 0;
	return this;
};

HOTP.prototype.gen = function(counter) {
	if (counter === null) {
		if (this.counter === null) {
			this.counter = 0;
		}
		counter = this.counter;
		var ret = this.gen(counter);
		this.counter += 1;
		return ret;
	}

	var num = this.otp_gen_number(counter, this.secret);
	num = num % 100000;
	if (num >= 10000) {
		return String(num);
	}
	num = "00000" + num;
	return num.substring(num.length - 5);
}

HOTP.prototype.verify = function(token, counter) {
	if (counter === undefined) {
		if (this.counter === undefined) {
			this.counter = 0;
		}
		counter = this.counter;
		return this.verify(token, counter);
	}
	for (var i = 0; i < this.window; i++) {
		{
			var tcounter = counter - i;
			if (token === this.gen(tcounter))
				return i;
		}
		if (i === 0)
			continue; {
			var tcounter = counter + i;
			if (token === this.gen(tcounter))
				return i;
		}
	}
	return null;
}

// 需要使用CryptoJS的HmacSHA1、WordArray，counter是32bit数字
HOTP.prototype.otp_gen_number = function(counter, secret) {
	function convert(wordArray) {
		var bytes20 = [];
		for (var i = 0, j = 0; i < 5; i++) {
			var v = wordArray.words[i];
			bytes20[j++] = ((v >> 24) & 0xFF);
			bytes20[j++] = ((v >> 16) & 0xFF);
			bytes20[j++] = ((v >> 8) & 0xFF);
			bytes20[j++] = ((v >> 0) & 0xFF);
		}

		var offset = bytes20[19] & 0xf;
		var v = (bytes20[offset] & 0x7F) << 24 |
			(bytes20[offset + 1] & 0xFF) << 16 |
			(bytes20[offset + 2] & 0xFF) << 8 |
			(bytes20[offset + 3] & 0xFF);

		return v;
	}

	function _gen_number(counter, secret) {
		var low = counter & 0xffffffff;
		var high = Math.floor(counter / 4294967296); // 没有long类型，使用除以2^32代替右移32位
		// console.log(counter, low, high);
		var message = CryptoJS.lib.WordArray.create([high, low], 8);
		var wordArray = CryptoJS.HmacSHA1(message, secret);
		var num = convert(wordArray);
		return num;
	}

	return _gen_number(counter, secret);
}

// ==================================================================================
var TOTP = function(secret, window, interval) {
	this.hotp = new HOTP(secret, window, 0);
	this.interval = interval || 30;
	return this;
}

TOTP.prototype.gen = function(timestamp) {
	timestamp = timestamp || new Date().getTime();
	var timestamp_second = Math.floor(timestamp / 1000);
	var tcounter = Math.floor(timestamp_second / this.interval);
	return this.hotp.gen(tcounter);
}

TOTP.prototype.gen2 = function(timestamp) {
	timestamp = timestamp || new Date().getTime();
	var timestamp_second = Math.floor(timestamp / 1000);
	var tcounter = Math.floor(timestamp_second / this.interval);
	var token = this.hotp.gen(tcounter);
	var step = timestamp_second % this.interval;
	var refresh_time = tcounter * this.interval;
	return {
		token: token, // 生成的令牌
		loop_length: this.interval, // 循环角度，循环长度
		loop_step: step, // 循环角度，循环到的步骤
		refresh_interval: this.interval * 1000, // 刷新周期
		refresh_time: refresh_time * 1000, // 刷新时间
		timestamp: timestamp, // 当前时间
	};
}

TOTP.prototype.verify = function(token) {
	var now = Math.floor(new Date().getTime() / 1000);
	var tcounter = Math.floor(now / this.interval);
	return this.hotp.verify(token, tcounter);
}

function makeCode(token, userId ) {
	var count = 3;
	var interval = 30;
	var code_length = 18;

	var otp1 = new TOTP(token, count, interval).gen();
	var otp2 = new TOTP(otp1, count, interval).gen();
	var otp3 = new TOTP(otp2, count, interval).gen();

	var lastInt = getLastBitNotZeroInt(otp1);
	var newId = userId * lastInt;
	var supplementLength = code_length - ("" + newId).length - 2; // code长度-新ID长度-前面两位

	var ret = "";
	ret += (supplementLength != 5 ? getRndInteger(1, 9) * 10 + supplementLength % 10 : "0" + supplementLength);
	ret += newId;
	ret += otp1;
	ret += otp2;
	ret += otp3;
	ret = ret.substr(0, code_length);

	return ret;
}

function getLastBitNotZeroInt(otp) {
	var otp = otp + '';
	var arr = otp.split('');
	for (var index = otp.length - 1; index >= 0; index--) {
		if (arr[index] != '0') {
			return arr[index];
		}
	}

	return '-1';
}

// 返回 min（包含）～ max（包含）之间的数字
function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
	HOTP: HOTP,
	TOTP: TOTP,
	makeCode: makeCode,
}
