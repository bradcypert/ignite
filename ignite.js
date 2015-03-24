#!/usr/bin/env node

process.title = 'Ignite';

//ignite --help
//ignite scaffold

// No Unit Tests :P

var args = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var mkdirp = require("mkdirp")
var getDirName = require("path").dirname

var files = [];

var getFilePaths = function(jsonObject, path){
  path = (""+path).replace('_files','');
  for(var attributename in jsonObject){
    if(typeof jsonObject[attributename] == "object"){
      attributename === "_files"? null : files.push(path+"/"+attributename);
      getFilePaths(jsonObject[attributename], path+"/"+attributename);
    }else{
      files.push(path+jsonObject[attributename]);
    }
  }
}

var logError = function(code, message){
  console.log("Error Code - "+code+": "+message);
}

var createStructure = function(files, cb){
  for(var file in files){
    if(!(/(\.\w+$)/ig.test(files[file])))
    mkdirp(files[file], function (err) {
      if (err)
        logError(2, "Directory Already Exists!");
    });
  }
  cb(files);
}

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
}

if(args.help){
  console.log("Usage: \tignite [options] [arguments]",
              "\n\nTo scaffold a new project:",
              "\n\tignite scaffold [arguements]",
              "\n\nOptions:",
              "\n\t--version\tprints the script's version"
              );
}else if (args.version){
  var pjson = require('./package.json');
  console.log("Ignite Verison:", pjson.version);
}else if (args._[0] == "scaffold" && args._[1]) {
  var templateName = args._[1];
  try{
    templateObject = JSON.parse(fs.readFileSync(__dirname+'/templates/'+templateName+'.json', 'utf8'));
    getFilePaths(templateObject.structure, process.cwd());
    createStructure(files, createFiles);
  } catch (e){
    logError(1, "Unable to load File: "+ templateName+"!");
  }
}
else{
  console.log("Incorrect usage: Try ignite --help for more information on how to use this tool.");
}
