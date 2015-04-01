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
    listTemplates(args.d);
    break;
  case "describe":
    if (!args._[1]) logError(3, "Missing arguments");else describe(args._[1], args.d);
    break;
  case "help":
    printHelp();
    break;
  case "verison":
    console.log("Ignite Verison:", pkg.version);
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

var localTemplates = "" + __dirname + "/../templates";
function logError(code, message) {
  console.log("Error Code - " + code + ": " + message);
}

function printHelp() {
  console.log("Usage: \tignite [options] [arguments]", "\n\nTo scaffold a new project:", "\n\tignite scaffold [arguements]", "\n\nOptions:", "\n\t--version\tprints the script's version");
}

function describe(templateName, customDir) {
  var filePath = path.join(localTemplates);

  // If CLI passed directory
  if (customDir) {
    templatePath = customDir;
  }

  // If enviroment variable is set
  if (process.env.IGNITE_DIR) {
    templatePath = process.env.IGNITE_DIR;
  }

  try {
    var templateObject = JSON.parse(fs.readFileSync(path.join(filePath, "" + templateName + ".json"), "utf8"));
    console.log("" + templateObject.name + " : " + templateObject.desc);
  } catch (e) {
    console.log(e);
    logError(1, "Unable to load File: " + templateName + "!");
  }
}

function listTemplates(customDir) {
  var filePath = path.join(localTemplates);

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
  files.map(function (files) {
    console.log(" " + file.replace(".json", ""));
  });
}