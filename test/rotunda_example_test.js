'use strict';

var rotunda_example = require('../lib/rotunda_example.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports["parseUrl"] = {
  'format, url': function(test) {
    test.expect(1);
    // tests here
    var format = "/:version/api/:collecton/:id";
    var url = "/6/api/listings/3?sort=desc&limit=10";
    var expectedValue = { version: 6, collecton: "listings", id: 3, sort: "desc", limit: 10 };
    test.deepEqual(rotunda_example.parseUrl(format, url), expectedValue, "should return an object with keys/values from the url");
    test.done();
  }
};

exports["createUrlStruct"] = {
  'url': function(test) {
    test.expect(1);
    // tests here
    var url = "/6/api/listings/3?sort=desc&limit=10";
    var expectedValue = { path: "/6/api/listings/3", options: "sort=desc&limit=10" };
    test.deepEqual(rotunda_example.createUrlStruct(url), expectedValue, "should return an object with path and options keys");
    test.done();
  }
};


exports["getPathObject"] = {
  'format, path': function(test) {
    test.expect(1);
    // tests here
    var format = "/:version/api/:collecton/:id";
    var path = "/6/api/listings/3";
    var expectedValue = { version: 6, collecton: "listings", id: 3 };
    test.deepEqual(rotunda_example.getPathObject(format, path), expectedValue, "should return an object with keys/values derived from the path");
    test.done();
  }
};


exports["getFormatKeys"] = {
  'format': function(test) {
    test.expect(1);
    // tests here
    var format = "/:version/api/:collecton/:id";
    var expectedValue = [{ name: "version", index: 1 }, { name: "collection", index: 3 }, { name: "id", index: 4 }];
    test.deepEqual(rotunda_example.getFormatKeys(format)[0], expectedValue[0], "should return an array of objects with key names and indexes");
    test.done();
  }
};


exports["mapKey"] = {
  setUp: function(done) {
    this.accumulator = [{ name: 'initialName', index: 2 }];
    this.index = 4;
    done();
  },
  'accumulator, :element, index': function(test) {
    test.expect(1);
    // tests here
    var element = ":nextName";
    var expectedValue = [{ name: "initialName", index: 2 }, { name: "nextName", index: 4 }];
    test.deepEqual(rotunda_example.mapKey(this.accumulator, element, this.index), expectedValue, "should add key to accumulator if preceded with :");
    test.done();
  },
  'accumulator, element, index': function(test) {
    test.expect(1);
    // tests here
    var element = "skipName";
    var expectedValue = [{ name: "initialName", index: 2 }];
    test.deepEqual(rotunda_example.mapKey(this.accumulator, element, this.index), expectedValue, "should skip key if not preceded with :");
    test.done();
  }
};


exports["getOptionsObject"] = {
  'options': function(test) {
    test.expect(1);
    // tests here
    var options = "sort=desc&limit=10";
    var expectedValue = { sort: "desc", limit: 10 };
    test.deepEqual(rotunda_example.getOptionsObject(options), expectedValue, "should return an object with keys/values derived from the options");
    test.done();
  }
};

exports["createOptionStruct"] = {
  'option': function(test) {
    test.expect(1);
    // tests here
    var option = "sort=desc";
    var expectedValue = { key: "sort", value: "desc" };
    test.deepEqual(rotunda_example.createOptionStruct(option), expectedValue, "should return an object with a key and value");
    test.done();
  }
};


exports["merge"] = {
  'object1, object2': function(test) {
    test.expect(1);
    // tests here
    var object1 = { version: 6, collecton: "listings", id: 3 };
    var object2 = { sort: "desc", limit: 10 };
    var expectedValue = { version: 6, collecton: "listings", id: 3, sort: "desc", limit: 10 };
    test.deepEqual(rotunda_example.merge(object1, object2), expectedValue, "should merge the provided objects");
    test.done();
  }
};


exports["numberfy"] = {
  '42': function(test) {
    test.expect(1);
    // tests here
    var string = "42";
    var expectedValue = 42;
    test.deepEqual(rotunda_example.numberfy(string), expectedValue, "should return an integer if !isNaN");
    test.done();
  },
  'asdf': function(test) {
    test.expect(1);
    // tests here
    var string = "asdf";
    var expectedValue = "asdf";
    test.deepEqual(rotunda_example.numberfy(string), expectedValue, "should return a string if isNaN");
    test.done();
  }
};