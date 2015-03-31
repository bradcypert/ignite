import mkdirp from 'mkdirp';
import fs from 'fs';
import path from 'path';

import {logError, printHelp, describe, pathBuilder} from './utils';
var files = [];

export function getFilePaths (jsonObject, path) {
  path = (`${path}`).replace('_files','');
  console.log(jsonObject);
  for(let attributename in jsonObject){
    console.log(`${attributename}`);
    if(typeof attributename == "object"){
      attributename === "_files"? null : files.push(`${path}/${attributename}`);
      getFilePaths(attributename, `${path}/${attributename}`);
    }else{
      files.push(`${path}${jsonObject[attributename]}`);
    }
  }
}

export function createStructure (files, cb) {
  for(var file of files){
    if(!(/(\.\w+$)/ig.test(file)))
    mkdirp(file, function (err) {
      if (err)
        logError(2, "Directory Already Exists!");
    });
  }
  cb(files);
}

export function createFiles (files) {
  for(var file of files){
    if(/(\.\w+$)/ig.test(file)){
      fs.writeFile(file,'', function(err){
        if(err){
          //If at first you don't succeed, try, try again.
          fs.writeFile(file,'');
        }
      });
    }
  }
}


export function scaffold (templateName, customDir){
  try{
    var folderName = path.join(`${__dirname}/../templates/`);
    if(customDir)
      folderName = customDir;
    if(!folderName.substr(folderName.length-1, 1) == "/")
      folderName+="/";

    let templateObject = JSON.parse(fs.readFileSync(`${folderName}${templateName}.json`, 'utf8'));
    getFilePaths(templateObject.structure, process.cwd());
    //createStructure(files, createFiles);
  } catch (e){
    console.log(e);
    logError(1, `Unable to load File at: ${folderName}${templateName}.json !`);
  }
}
