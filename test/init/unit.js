// This is run before all tests

global.supertest = require('supertest-as-promised');
global.sinon = require('sinon');
global.chai = require('chai');

global.expect = global.chai.expect;
