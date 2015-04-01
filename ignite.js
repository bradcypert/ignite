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

switch(args._[0]) {
  case "scaffold":
    if(!args._[1]) logError(3, 'Missing arguments');
    else scaffold(args._[1], args.d);
    break;
  case "list":
    listTemplates();
    break;
  case "describe":
    if(!args._[1]) logError(3, 'Missing arguments');
    else describe(args._[1]);
    break;
  case "help":
    printHelp();
    break;
  case "verison":
    console.log("Ignite Verison:", pkg.version);
    break;
  default:
    console.log("Incorrect usage: Try ignite help for more information on how to use this tool.");
    break;
};
