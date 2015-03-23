#!/usr/bin/env node

process.title = 'Ignite';

//ignite --help
//ignite scaffold

// No Unit Tests :P

var args = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var touch = require("touch")

var files = [];

function createDirs(jsonObject, path){
  path = (""+path).replace('_files','');
  fs.exists(path, function(exists){
    if(exists)
      console.log('path already exists');
    else{
      try{
        fs.mkdirSync(path);
      }catch(e){
        //Add appropriate error handling.
      }
    }
  });

  for(var attributename in jsonObject){
    if(typeof jsonObject[attributename] == "object"){
      createDirs(jsonObject[attributename], path+"/"+attributename);
    }
    else{
      fullPath = path+jsonObject[attributename];
      files.push(fullPath);
    }
  }
}

function createFiles(){
  for(var path in files){
    fs.writeFile(files[path], '');
  }
}

if(args.help){
  console.log("Usage: \tignite [options] [arguments]",
              "\n\nTo scaffold a new project:",
              "\n\tignite scaffold"
              );
} else if (args._[0] == "scaffold" && args._[1]) {
  templateName = args._[1];
  templateObject = JSON.parse(fs.readFileSync(__dirname+'/templates/'+templateName+'.json', 'utf8'));
  //do the things here
  //recursively create folder structure
  createDirs(templateObject.structure, process.cwd());
  setTimeout(createFiles(), 2500);
}
