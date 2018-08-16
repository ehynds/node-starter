// This is run before all tests

global.supertest = require('supertest-as-promised');
global.sinon = require('sinon');
global.chai = require('chai');
global.nock = require('nock');

global.expect = global.chai.expect;

global.app = require('../../src/app');
global.config = require('../../src/config');
