var ignite = require('../ignite.js');
var demand = require('must');
var assert = require("assert");


describe('Ignite', function () {
  it('ignite.js should exist', function () {
    demand(ignite).to.exist();
  });
});

describe('Ignite.getFilePaths', function () {
  it('getFilePaths should exist', function () {
    demand(ignite.getFilePaths).to.exist();
  });
});


describe('Ignite.logError', function () {
  it('LogError should exist', function () {
    demand(ignite.logError).to.exist();
  });
});


describe('Ignite.describe', function () {
  it('describe should exist', function () {
    demand(ignite.describe).to.exist();
  });
});

describe('Ignite.createStructure', function () {
  it('createStructure should exist', function () {
    demand(ignite.createStructure).to.exist();
  });
});

describe('Ignite.createFiles', function () {
  it('createFiles should exist', function () {
    demand(ignite.createFiles).to.exist();
  });
});