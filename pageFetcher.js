const request = require('request');
const fs = require('fs');
const readline = require('readline');

const callbackWrite = (error, body) => {
  if (!error) {
    fs.writeFile(process.argv[3], body, (err) => {
      if (!err) {
        console.log(`Downloaded and saved ${body.length} bytes to ${process.argv[3]}`);
      } else {
        console.log('Problem accessing file');
        console.log(err);
      }
    });
  } else {
    console.log('Problem accessing url');
    console.log(error);
  }
}
const requestCB = function(error, response, body) {
  fs.access(process.argv[3], fs.constants.F_OK, (err) => {
    if (err) {
      callbackWrite(error, body);
    } else {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      rl.question(`${process.argv[3]} already exists. Enter y to overwrite\n`, (answer) => {
        if (answer === 'y') {
          callbackWrite(error, body);
          rl.close();
        } else {
          rl.close();
        }
      });
    }
  });
}
request(process.argv[2], requestCB);

