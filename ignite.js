#!/usr/bin/env node

process.title = 'Ignite';

//ignite --help
//ignite scaffold

// No Unit Tests :P

var args = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var mkdirp = require("mkdirp");
var getDirName = require("path").dirname;
var updateNotifier = require('update-notifier');
var pkg = require('./package.json');
var colors = require('colors');

var files = [];

var getFilePaths = function(jsonObject, path){
  path = (""+path).replace('_files','');
  for(var attributename in jsonObject){
    if(typeof jsonObject[attributename] == "object"){
      attributename === "_files" ? null : files.push(path+"/"+attributename);
      getFilePaths(jsonObject[attributename], path+"/"+attributename);
    }else{
      files.push(path+jsonObject[attributename]);
    }
  }
};

var logError = function(code, message){
  console.log(("Error Code - "+code).red+": "+message);
};

var printHelp = function(){
  console.log("Usage: \tignite [options] [arguments]".yellow,
              "\n\nTo scaffold a new project:",
              "\n\tignite scaffold [arguements] [templateName]",
              "\n\nOptions:",
              "\n\t--version\tprints the script's version"
              );
};

var describe = function(templateName){
  try{
    templateObject = JSON.parse(fs.readFileSync(__dirname+'/templates/'+templateName+'.json', 'utf8'));
    console.log(templateObject.name, ":", templateObject.desc);
  } catch (e) {
    logError(1, "Unable to load File: "+ templateName+"!");
  }
};

var createStructure = function(files, cb){
  for(var file in files){
    if(!(/(\.\w+$)/ig.test(files[file]))) {
    mkdirp(files[file], function (err) {
      if (err){
        logError(2, "Directory Already Exists!");
      }
    });
    }
  }
  cb(files);
};

var createFiles = function(files){
  for(var file in files){
    if(/(\.\w+$)/ig.test(files[file])){
      fs.writeFile(files[file],'', function(err){
        if(err){
          //If at first you don't succeed, try, try again.
          fs.writeFile(files[file],'');
        }
      });
    }
  }
};

console.log("Ignite".red + " - A fiery JSON-based scaffolding tool for Node.js")

updateNotifier({pkg: pkg}).notify();

if(args.help){
  printHelp();
}
else if (args.version){
  console.log("Ignite Verison:".yellow, pkg.version.green);
}
else if (args._[0] == "scaffold" && args._[1]) {
  var templateName = args._[1];
  try{
    folderName = __dirname+'/templates/';
    if(args.d){
      folderName = args.d;
    }
    if(!folderName.substr(folderName.length-1, 1) == "/"){
      folderName+="/";
    }

    templateObject = JSON.parse(fs.readFileSync(folderName+templateName+'.json', 'utf8'));
    getFilePaths(templateObject.structure, process.cwd());
    createStructure(files, createFiles);
    describe(templateName);
  } catch (e){
    logError(1, "Unable to load File at: " +folderName+templateName+" !");
  }
}
else if(args._[0] == "list"){
  files = fs.readdirSync(__dirname+"/templates");
  console.log("Available Ignite Templates:".cyan);
  for(var file in files){
    console.log("",files[file].replace(".json", ""));
  }
}
else if(args._[0] == "describe" && args._[1]){
  describe(args._[1]);
}
else{
  console.log("Incorrect usage:".red + " Try ignite --help for more information on how to use this tool.");
}

module.exports = {
  getFilePaths: getFilePaths,
  logError: logError,
  describe: describe,
  createStructure: createStructure,
  createFiles: createFiles
};
