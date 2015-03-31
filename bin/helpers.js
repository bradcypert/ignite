var exports = module.exports = {};

exports.getFilePaths = function(jsonObject, path){
  path = (""+path).replace('_files','');
  for(var attributename in jsonObject){
    if(typeof jsonObject[attributename] == "object"){
      attributename === "_files"? null : files.push(path+"/"+attributename);
      getFilePaths(jsonObject[attributename], path+"/"+attributename);
    }else{
      files.push(path+jsonObject[attributename]);
    }
  }
};

exports.logError = function(code, message){
  console.log("Error Code - "+code+": "+message);
};

exports.printHelp = function(){
  console.log("Usage: \tignite [options] [arguments]",
              "\n\nTo scaffold a new project:",
              "\n\tignite scaffold [arguements]",
              "\n\nOptions:",
              "\n\t--version\tprints the script's version"
              );
};

exports.describe = function(templateName){
  try{
    console.log(__dirname);
    templateObject = JSON.parse(fs.readFileSync('../templates/'+templateName+'.json', 'utf8'));
    console.log(templateObject.name, ":", templateObject.desc);
  } catch (e) {
    logError(1, "Unable to load File: "+ templateName+"!");
  }
};

exports.createStructure = function(files){
  for(var file in files){
    if(!(/(\.\w+$)/ig.test(files[file])))
    mkdirp(files[file], function (err) {
      if (err)
        logError(2, "Directory Already Exists!");
    });
  }
  exports.createFiles(files);
};

exports.createFiles = function(files){
  for(var file in files){
    if(/(\.\w+$)/ig.test(files[file])){
      fs.writeFile(files[file],'', function(err){
        if(err){
          //If at first you don't succeed, try, try again.
          fs.writeFile(files[file],'');
        }
      });
    }
  }
};
