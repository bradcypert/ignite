import request from 'request'
import express from 'express'
import path from 'path'
import fs from 'fs'

let templatePath = path.join(`${__dirname}/../templates/`);

// This is a hack to simply host the template files somewhere for now
export function startApiServer(){
  let app = express();
  app.use('/user', express.static(`$[process.cwd()}/templates`));
  app.listen(process.env.PORT || 3000)
}

export function getApi (user, name) {
  let data = {
    method: 'GET',
    url:  `http://localhost:3000/${user}/${name}.json`,
  };
  if(user && name) {
    startApiServer();
    request(data).pipe(fs.createWriteStream(`${templatePath}download-${name}.json`));
  } else {
    if(!user) {
      console.log('No Username')
      process.exit(0)
    }
    if(!name) {
      console.log('No project')
      process.exit(0)
    }
  }
};