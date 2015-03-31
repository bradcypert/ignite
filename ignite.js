#!/usr/bin/env node

import minimist from 'minimist';
import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import updateNotifier from 'update-notifier';
import pkg from './package.json';
import {logError, printHelp, describe, listTemplates} from './lib/utils'
import {getFilePaths, createStructure, createFiles, scaffold} from './lib/fileHelpers'


process.title = 'Ignite';

var args = minimist(process.argv.slice(2));
var getDirName = path.dirname;

updateNotifier({pkg: pkg}).notify();

if(args.help){
  printHelp();
}
else if (args._[0] == "scaffold" && args._[1]) {
  scaffold(args._[1], args.d);
}
else if(args._[0] == "list"){
  listTemplates();
}
else if(args._[0] == "describe" && args._[1]){
  describe(args._[1]);
}
else if (args.version){
  console.log("Ignite Verison:", pkg.version);
}
else{
  console.log("Incorrect usage: Try ignite --help for more information on how to use this tool.");
}
