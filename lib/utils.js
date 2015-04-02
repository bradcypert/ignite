import path from 'path'
import fs from 'fs'

let localTemplates = `${__dirname}/../templates`;

/**
* Error Logging
*/
export function logError (code, message) {
  console.log(`Error Code - ${code}: ${message}`);
}

/**
* CLI Help flag
*/
export function printHelp () {
  console.log("Usage: \tignite [options] [arguments]",
              "\n\nTo scaffold a new project:",
              "\n\tignite scaffold [arguements]",
              "\n\nOptions:",
              "\n\t--version\tprints the script's version"
              );
}

/**
* Parses template schema for description
*/
export function describe (templateName, customDir) {
  let filePath = path.join(localTemplates);

  // If CLI passed directory
  if(customDir) {
    templatePath = customDir;
  }

  // If enviroment variable is set
  if(process.env.IGNITE_DIR) {
    templatePath = process.env.IGNITE_DIR;
  }

  try {
    let templateObject = JSON.parse(fs.readFileSync(path.join(filePath,`${templateName}.json`), 'utf8'));
    console.log(`${templateObject.name} : ${templateObject.desc}`);
  } catch (e) {
    console.log(e);
    logError(1, `Unable to load File: ${templateName}!`);
  }
}

/**
* Walks directory for schemas
*/
export function listTemplates(customDir){
  let filePath = path.join(localTemplates);

  // If CLI passed directory
  if(customDir) {
    filePath = customDir;
  }

  // If enviroment variable is set
  if(process.env.IGNITE_DIR) {
    filePath = process.env.IGNITE_DIR;
  }

  // walk path
  let files = fs.readdirSync(filePath);
  console.log("Available Ignite Templates:");

  // Map each file to console
  files.map( (files) => {
    console.log(` ${file.replace('.json', '')}`);
  });
}
