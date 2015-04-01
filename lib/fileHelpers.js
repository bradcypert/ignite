import mkdirp from 'mkdirp';
import fs from 'fs';
import path from 'path';
import {logError, printHelp, describe, pathBuilder} from './utils';

var files = [];

export function getFilePaths (jsonObject, path) {
  path = (`${path}`).replace('_files','');
  for(let attributename in jsonObject){
    if(typeof jsonObject[attributename] === "object"){
      attributename === "_files" ? null : files.push(`${path}/${attributename}`);
      getFilePaths(jsonObject[attributename], `${path}/${attributename}`);
    } else {
      files.push(`${path}${jsonObject[attributename]}`);
    }
  }
}

export function createStructure (files, cb) {
  files
  .map((file) => { return file })
  .filter((file) => { if(!(/(\.\w+$)/ig.test(file))) { return file } })
  .forEach((file) => {
    mkdirp(file, function (err) {
      if (err){
        logError(2, "Directory Already Exists!");
      }
    });
  });
  cb(files);
}

export function createFiles (files) {
  files
  .map((file) => { return file })
  .filter((file) => { if((/(\.\w+$)/ig.test(file))) { return file } })
  .forEach((file) => {
    fs.writeFile(file,'', function(err){
      if(err){
        fs.writeFile(file,'');
      }
    });
  });
}

export function scaffold (templateName, customDir){
  try{
    var folderName = path.join(`${__dirname}/../templates/`);
    if(customDir) {
      folderName = customDir;
    }
    if(!folderName.substr(folderName.length-1, 1) == "/"){
      folderName+="/";
    }
    let templateObject = JSON.parse(fs.readFileSync(`${folderName}${templateName}.json`, 'utf8'));
    getFilePaths(templateObject.structure, process.cwd());
    createStructure(files, createFiles);
  } catch (e){
    console.log(e);
    logError(1, `Unable to load File at: ${folderName}${templateName}.json !`);
  }
}
