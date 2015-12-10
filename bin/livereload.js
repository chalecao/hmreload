#!/usr/bin/env node
var exec = require('child_process').exec;
var cmdStr = 'gulp';
exec(cmdStr, function(err,stdout,stderr){

});
require('../lib/command').run();


