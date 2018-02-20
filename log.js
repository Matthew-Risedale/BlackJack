const fs = require('fs');

exports.logger = {
  writeLog: (data, callback) => {
    if(!callback){
      callback = (err) => {
        if (err) throw err;
      }
    };
    fs.appendFile( './log.txt', data, callback);
  },
  readLog: () => {
    console.log(fs.readFileSync('./log.txt', "utf8"));
  }
}