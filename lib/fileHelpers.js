import mkdirp from 'mkdirp';
import fs from 'fs';
import path from 'path';
import {logError, printHelp, describe, pathBuilder} from './utils';

var files = [];

/**
* Get paths from template schema
*/
export function getFilePaths (schema, pathTo) {
  pathTo = (`${pathTo}`).replace('_files','');
  for(let item in schema){
    if(typeof schema[item] === "object"){
      item === "_files" ? null : files.push(path.join(pathTo, item));
      getFilePaths(schema[item], path.join(pathTo, item));
    } else {
      files.push(path.join(pathTo, schema[item]));
    }
  }
}

/**
* Initialize Directories
*/
export function createStructure (files, cb) {
  files
  .filter((file) => { if(!(/(\.\w+$)/ig.test(file))) { return file } })
  .map((file) => {
    mkdirp(file, function (err) {
      if (err){
        logError(2, "Directory Already Exists!");
      }
    });
  });
  cb(files);
}

/**
* Initialize files.
*/
export function createFiles (files) {
  files
  .filter((file) => { if((/(\.\w+$)/ig.test(file))) { return file } })
  .map((file) => {
    fs.writeFile(file,'', function(err){
      if(err){
        fs.writeFile(file,'');
      }
    });
  });
}

/**
* Initialize scaffold configuration.
*/
export function scaffold (template, customDir){
  try{
    //  Default Template path
    let templatePath = path.join(`${__dirname}/../templates/`);

    // If CLI passed directory
    if(customDir) {
      templatePath = customDir;
    }

    // If enviroment variable is set
    if(process.env.IGNITE_DIR) {
      templatePath = process.env.IGNITE_DIR;
    }

    // Add trailing slash
    if(!templatePath.substr(templatePath.length-1, 1) == "/"){
      templatePath+="/";
    }
    // Parse template
    let templateObject = JSON.parse(fs.readFileSync(`${templatePath}${template}.json`, 'utf8'));

    // Get file structure from schema
    getFilePaths(templateObject.structure, process.cwd());

    // Create file structure from schema
    createStructure(files, createFiles);

  // If error reading templates
  } catch (e){
    console.log(e);
    logError(1, `Unable to load File at: ${templatePath}${template}.json !`);
  }
}
