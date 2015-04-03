import request from 'request'
import path from 'path'
import fs from 'fs'

/**
* Github API url for contents, if variable found in format username/repo, reference that repo instead.
*/
let ghContentsUrl = process.env.IGNITE_TEMPLATES_REPO || "https://api.github.com/repos/bc-ignite/templates/contents/";


/**
* Returns github's base64 of the file in utf8 format
* if obj is true, it returns the JSON as a object.
*/
let parseGhContent = (content, obj) => {
  let contentBuffer = new Buffer(JSON.parse(content).content, 'base64');
  if(obj) {
    return JSON.parse(contentBuffer.toString('utf8'));
  } else {
    return contentBuffer.toString('utf8');
  }
}

/**
* Base http handler with callback, sets UA
*/
export function httpHandler (data, cb) {
  data.headers = {
      'User-Agent': 'ignite-cli'
  };
  request(data, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      cb(body);
    } else {
      logError(4, `Unable to connect to ${data.url}`)
    }
  });
}

/**
* Retrieves list of files from github repo
*/
export function getListGh () {
   let data = {
    method: 'GET',
    url:  `${ghContentsUrl}`,
  };
  httpHandler(data, (content) => {
    console.log("Available Ignite Templates:");
    let data = JSON.parse(content)
    data.map( (file) =>{
      console.log(`${file.name.replace('.json', '')}`);
    });
  });
}

/**
* Writes file with content, returns name
*/
export function ghSchemaWrite (file, name, data) {
  let description = JSON.parse(data).desc;
  fs.writeFile(file, data, function(err) {
    if(err) {
      fs.writeFile(file, data);
    };
  });
  // if theres a description and name, put it in console.
  if(description && name) console.log(`Saved! ${name} - ${description}`);
}

/**
* Grabs schema from github repo bc-ignite/templates/${name}, saves to file
*/
export function getSchemaGh (name) {
  let data = {
    method: 'GET',
    url:  `${ghContentsUrl}${name}.json`,
  };
  if(name) {
    httpHandler(data, (content) => {
      let templatePath = path.join(`${__dirname}/../templates/`);
      let schema = parseGhContent(content);
      ghSchemaWrite(`${templatePath}${name}.json`, name, schema);
    });
  } else {
      logError(5,'Project name missing');
  };
};

/**
* Grabs description from github repo bc-ignite/templates/${name}
*/
export function getDescGh (name) {
  let data = {
    method: 'GET',
    url:  `${ghContentsUrl}${name}.json`,
  };
  if(name) {
    httpHandler(data, (content) => {
      let data = parseGhContent(content, 1);
      console.log(`${name} : ${data.desc}`);
    });
  } else {
    logError(5,'Project name missing');
  };
};

