const fs = require('fs');

exports.help = () => {
  console.log(fs.readFileSync('./help.txt', "utf8"));
}