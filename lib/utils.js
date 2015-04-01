import fs from 'fs';
import path from 'path';

var localTemplates = `${__dirname}/../templates`;

export function logError (code, message) {
  console.log(`Error Code - ${code}: ${message}`);
}

export function printHelp () {
  console.log("Usage: \tignite [options] [arguments]",
              "\n\nTo scaffold a new project:",
              "\n\tignite scaffold [arguements]",
              "\n\nOptions:",
              "\n\t--version\tprints the script's version"
              );
}

export function describe (templateName){
  try {
    let templateObject = JSON.parse(fs.readFileSync(path.join(`${localTemplates}/${templateName}.json`), 'utf8'));
    console.log(`${templateObject.name} : ${templateObject.desc}`);
  } catch (e) {
    console.log(e);
    logError(1, `Unable to load File: ${templateName}!`);
  }
}

export function listTemplates(){
  let filePath = path.join(localTemplates);
  var files = fs.readdirSync(filePath);
  console.log("Available Ignite Templates:");
  for(let file of files){
    console.log(` ${file.replace('.json', '')}`);
  }
}
