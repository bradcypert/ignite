#!/usr/bin/env node

process.title = 'Ignite';

//ignite --help
//ignite scaffold

// No Unit Tests :P

var args = require('minimist')(process.argv.slice(2));
var fs = require('fs');

function createFile(jsonObject, path){
  path = (""+path).replace('_files','');

  fs.exists(path, function(exists){
    if(exists)
      console.log('path already exists');
    else{
      fs.mkdirSync(path);
    }
  });


  for(var attributename in jsonObject){
    if(typeof jsonObject[attributename] == "object"){

      createFile(jsonObject[attributename], path+"/"+attributename);
    }
    else{
      //console.log("\t"+jsonObject[attributename]);
    }
  }
}

if(args.help){
  console.log("Usage: \tignite [options] [arguments]",
              "\n\nTo scaffold a new project:",
              "\n\tignite scaffold"
              );
} else if (args._[0] == "scaffold" && args._[1]) {
  templateName = args._[1];
  templateObject = JSON.parse(fs.readFileSync('templates/'+templateName+'.json', 'utf8'));
  //do the things here
  //recursively create folder structure
  createFile(templateObject.structure, process.cwd());
}
