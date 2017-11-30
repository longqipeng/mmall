"use strict";

require('./index.css');
require('../../module.js');
console.log('hello index');

var _mm = require('util/mm.js');

_mm.request({
	 url: '/product/list.do?keyword=1',
	 success: function(res){
	 	console.log(res);
	 },
	 error: function(errMsg){
	 	console.log(errMsg);
	 }
})

console.log(_mm.getUrlParam('test'))

var template = "<div>{{data.d}}</div>";
var data = {
	data: {
		d: 'test'
	}
}

console.log(_mm.renderHtml(template, data));

