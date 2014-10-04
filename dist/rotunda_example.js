/*! rotunda_example - v0.1.0 - 2014-10-04
* https://github.com/timothycommoner/rotunda_example
* Copyright (c) 2014 commoner; Licensed MIT */
(function(exports) {

	'use strict';

	exports.parseUrl = function(format, url) {
		var urlStruct = exports.createUrlStruct(url);
		var pathObject = exports.getPathObject(format, urlStruct.path);
		var optionsObject = exports.getOptionsObject(urlStruct.options);
		return exports.merge(pathObject, optionsObject);
	};

	exports.createUrlStruct = function(url) {
		var urlComponents = url.split("?");
		var path = urlComponents[0];
		var options = urlComponents[1];
		return { path: path, options: options };
	};

	exports.getPathObject = function(format, path) {
		var formatKeys = exports.getFormatKeys(format);
		var pathElements = path.split("/");
		return formatKeys.reduce(function(accumulator, key) {
			accumulator[key.name] = pathElements[key.index];
			return accumulator;
		}, {});
	};

	exports.getFormatKeys = function(format) {
		var keys = format.split("/");
		return keys.reduce(exports.mapKey, []);
	};

	exports.mapKey = function(accumulator, element, index) {
		var elementIsAnVariable = element[0] === ":";

		if (elementIsAnVariable){
			var elementName = exports.numberfy(element.substring(1));
			var key = { name: elementName, index: index };
			accumulator.push(key);
		}
		return accumulator;
	};

	exports.getOptionsObject = function(options) {
		var optionsArray = options.split("&");

		return optionsArray.reduce(function(accumulator, option) {
			var optionStruct = exports.createOptionStruct(option);
			accumulator[optionStruct.key] = exports.numberfy(optionStruct.value);
			return accumulator;
		}, {});
	};

	exports.createOptionStruct = function(option) {
		var optionComponents = option.split("=");
		return { key: optionComponents[0], value: optionComponents[1] };
	};

	exports.merge = function(object1, object2) {
		for (var key in object2) { object1[key] = object2[key]; }
		return object1;
	};

	exports.numberfy = function(string) {
		return (isNaN(string) ? string : parseInt(string, 10));
	};

}(typeof exports === 'object' && exports || this));
