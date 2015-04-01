import request from 'request'
import express from 'express'
import path from 'path'

// This is a hack to simply host the template files somewhere for now
let app = express();
app.use('/user', express.static(process.cwd() + '/templates'));
app.listen(process.env.PORT || 3000)

export function getApi (user, name) {
  let data = {
    method: 'GET',
    url:  `http://localhost:3000/${user}/${name}.json`,
  };
  request(data, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      process.exit(0);
    };
  });
};