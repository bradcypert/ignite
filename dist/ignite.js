#!/usr/bin/env node

"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/**
* Get paths from template schema
*/
exports.getFilePaths = getFilePaths;

/**
* Initialize Directories
*/
exports.createStructure = createStructure;

/**
* Initialize files.
*/
exports.createFiles = createFiles;

/**
* Initialize scaffold configuration.
*/
exports.scaffold = scaffold;
Object.defineProperty(exports, "__esModule", {
  value: true
});

var mkdirp = _interopRequire(require("mkdirp"));

var fs = _interopRequire(require("fs"));

var path = _interopRequire(require("path"));

var files = [];
function getFilePaths(schema, pathTo) {
  pathTo = ("" + pathTo).replace("_files", "");
  for (var item in schema) {
    if (typeof schema[item] === "object") {
      item === "_files" ? null : files.push(path.join(pathTo, item));
      getFilePaths(schema[item], path.join(pathTo, item));
    } else {
      files.push(path.join(pathTo, schema[item]));
    }
  }
}

function createStructure(files, cb) {
  files.filter(function (file) {
    if (!/(\.\w+$)/ig.test(file)) {
      return file;
    }
  }).map(function (file) {
    mkdirp(file, function (err) {
      if (err) {
        logError(2, "Directory Already Exists!");
      }
    });
  });
  cb(files);
}

function createFiles(files) {
  files.filter(function (file) {
    if (/(\.\w+$)/ig.test(file)) {
      return file;
    }
  }).map(function (file) {
    fs.writeFile(file, "", function (err) {
      if (err) {
        fs.writeFile(file, "");
      }
    });
  });
}

function scaffold(template, customDir) {
  try {
    //  Default Template path
    var _templatePath = path.join("" + __dirname + "/../templates/");

    // If CLI passed directory
    if (customDir) {
      _templatePath = customDir;
    }

    // If enviroment variable is set
    if (process.env.IGNITE_DIR) {
      _templatePath = process.env.IGNITE_DIR;
    }

    // Add trailing slash
    if (!_templatePath.substr(_templatePath.length - 1, 1) == "/") {
      _templatePath += "/";
    }
    // Parse template
    var templateObject = JSON.parse(fs.readFileSync("" + _templatePath + "" + template + ".json", "utf8"));

    // Get file structure from schema
    getFilePaths(templateObject.structure, process.cwd());

    // Create file structure from schema
    createStructure(files, createFiles);

    // If error reading templates
  } catch (e) {
    console.log(e);
    logError(1, "Unable to load File at: " + templatePath + "" + template + ".json !");
  }
}
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/**
* Base http handler with callback, sets UA
*/
exports.httpHandler = httpHandler;

/**
* Retrieves list of files from github repo
*/
exports.getListGh = getListGh;

/**
* Writes file with content, returns name
*/
exports.ghSchemaWrite = ghSchemaWrite;

/**
* Grabs schema from github repo bc-ignite/templates/${name}, saves to file
*/
exports.getSchemaGh = getSchemaGh;

/**
* Grabs description from github repo bc-ignite/templates/${name}
*/
exports.getDescGh = getDescGh;
Object.defineProperty(exports, "__esModule", {
  value: true
});

var request = _interopRequire(require("request"));

var path = _interopRequire(require("path"));

var fs = _interopRequire(require("fs"));

/**
* Github API url for contents, if variable found in format username/repo, reference that repo instead.
*/
var ghContentsUrl = process.env.IGNITE_TEMPLATES_REPO || "https://api.github.com/repos/bc-ignite/templates/contents/";

/**
* Returns github's base64 of the file in utf8 format
* if obj is true, it returns the JSON as a object.
*/
var parseGhContent = function (content, obj) {
  var contentBuffer = new Buffer(JSON.parse(content).content, "base64");
  if (obj) {
    return JSON.parse(contentBuffer.toString("utf8"));
  } else {
    return contentBuffer.toString("utf8");
  }
};
function httpHandler(data, cb) {
  data.headers = {
    "User-Agent": "ignite-cli"
  };
  request(data, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      cb(body);
    } else {
      logError(4, "Unable to connect to " + data.url);
    }
  });
}

function getListGh() {
  var data = {
    method: "GET",
    url: "" + ghContentsUrl };
  httpHandler(data, function (content) {
    console.log("Available Ignite Templates:");
    var data = JSON.parse(content);
    data.map(function (file) {
      console.log("" + file.name.replace(".json", ""));
    });
  });
}

function ghSchemaWrite(file, name, data) {
  var description = JSON.parse(data).desc;
  fs.writeFile(file, data, function (err) {
    if (err) {
      fs.writeFile(file, data);
    };
  });
  // if theres a description and name, put it in console.
  if (description && name) console.log("Saved! " + name + " - " + description);
}

function getSchemaGh(name) {
  var data = {
    method: "GET",
    url: "" + ghContentsUrl + "" + name + ".json" };
  if (name) {
    httpHandler(data, function (content) {
      var templatePath = path.join("" + __dirname + "/../templates/");
      var schema = parseGhContent(content);
      ghSchemaWrite("" + templatePath + "" + name + ".json", name, schema);
    });
  } else {
    logError(5, "Project name missing");
  };
}

;
function getDescGh(name) {
  var data = {
    method: "GET",
    url: "" + ghContentsUrl + "" + name + ".json" };
  if (name) {
    httpHandler(data, function (content) {
      var data = parseGhContent(content, 1);
      console.log("" + name + " : " + data.desc);
    });
  } else {
    logError(5, "Project name missing");
  };
}

;
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var minimist = _interopRequire(require("minimist"));

var fs = _interopRequire(require("fs"));

var mkdirp = _interopRequire(require("mkdirp"));

var path = _interopRequire(require("path"));

var updateNotifier = _interopRequire(require("update-notifier"));

var pkg = _interopRequire(require("../package.json"));

process.title = "Ignite";

var args = minimist(process.argv.slice(2));
var getDirName = path.dirname;

updateNotifier({ pkg: pkg }).notify();

/**
 * CLI Parser
 */
switch (args._[0]) {
  case "scaffold":
    if (!args._[1]) logError(3, "Missing arguments");else scaffold(args._[1], args.d);
    break;
  case "list":
    listTemplates(args.d, args.remote);
    break;
  case "describe":
    if (!args._[1]) logError(3, "Missing arguments");else describe(args._[1], args.d, args.remote);
    break;
  case "help":
    printHelp();
    break;
  case "verison":
    console.log("Ignite Verison:", pkg.version);
    break;
  case "install":
    getSchemaGh(args._[1]);
    break;
  default:
    console.log("Incorrect usage: Try ignite help for more information on how to use this tool.");
    break;
};
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/**
* Error Logging
*/
exports.logError = logError;

/**
* CLI Help flag
*/
exports.printHelp = printHelp;

/**
* Parses template schema for description
*/
exports.describe = describe;

/**
* Walks directory for schemas
*/
exports.listTemplates = listTemplates;
Object.defineProperty(exports, "__esModule", {
  value: true
});

var fs = _interopRequire(require("fs"));

var path = _interopRequire(require("path"));

function logError(code, message) {
  console.log("Error Code - " + code + ": " + message);
}

function printHelp() {
  console.log("Usage: \tignite [options] [arguments]", "\n\nTo scaffold a new project:", "\n\tignite scaffold [arguements]", "\n\nOptions:", "\n\t--version\tprints the script's version");
}

function describe(templateName, customDir, api) {
  if (api) {

    getDescGh(templateName);
  } else {

    var filePath = "" + __dirname + "/../templates";
    // If CLI passed directory
    if (customDir) {
      filePath = customDir;
    }

    // If enviroment variable is set
    if (process.env.IGNITE_DIR) {
      filePath = process.env.IGNITE_DIR;
    }

    try {
      var templateObject = JSON.parse(fs.readFileSync(path.join(filePath, "" + templateName + ".json"), "utf8"));
      console.log("" + templateObject.name + " : " + templateObject.desc);
    } catch (e) {
      console.log(e);
      logError(1, "Unable to load File: " + templateName + "!");
    }
  }
}

function listTemplates(customDir, api) {
  if (api) {
    getListGh();
  } else {

    var filePath = path.join("" + __dirname + "/../templates");

    // If CLI passed directory
    if (customDir) {
      filePath = customDir;
    }

    // If enviroment variable is set
    if (process.env.IGNITE_DIR) {
      filePath = process.env.IGNITE_DIR;
    }

    // walk path
    var files = fs.readdirSync(filePath);
    console.log("Available Ignite Templates:");

    // Map each file to console
    files.map(function (file) {
      console.log(" " + file.replace(".json", ""));
    });
  }
}