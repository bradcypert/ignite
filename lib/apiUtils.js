import request from 'request'
import express from 'express'
import path from 'path'
import fs from 'fs'

let templatePath = path.join(`${__dirname}/../templates/`);

export function getApi (name) {
  let data = {
    method: 'GET',
    url:  `https://api.github.com/repos/bc-ignite/templates/contents/${name}.json`,
    headers: {
      'User-Agent': 'ignite-cli'
    }
  };
  if(name) {
    request(data, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let contentBuffer = new Buffer(JSON.parse(body).content, 'base64');
        let contentClean = contentBuffer.toString('utf8')
        fs.writeFile(`${templatePath}${name}.json`, contentClean, function(err){
          if(err){
            fs.writeFile(`${templatePath}${name}.json`,contentClean);
          }
        })
        console.log(`${name} Saved!`)
      } else {
        logError(4, 'Cannot connect to github services')
      }
    })
  } else {
      console.log('No project')
  }
};