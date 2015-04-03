import fs from 'fs';
import path from 'path';

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
export function describe (templateName, customDir, api) {
  if(api) {

    getDescGh(templateName);

  } else {

    let filePath = `${__dirname}/../templates`
    // If CLI passed directory
    if(customDir) {
      filePath = customDir;
    }

    // If enviroment variable is set
    if(process.env.IGNITE_DIR) {
      filePath = process.env.IGNITE_DIR;
    }

    try {
      let templateObject = JSON.parse(fs.readFileSync(path.join(filePath,`${templateName}.json`), 'utf8'));
      console.log(`${templateObject.name} : ${templateObject.desc}`);
    } catch (e) {
      console.log(e);
      logError(1, `Unable to load File: ${templateName}!`);
    }
  }
}

/**
* Walks directory for schemas
*/
export function listTemplates(customDir, api){
  if(api) {
     getListGh()
  } else {

    let filePath = path.join(`${__dirname}/../templates`);

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
    files.map( (file) => {
      console.log(` ${file.replace('.json', '')}`);
    });

  }
}
