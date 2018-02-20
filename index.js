#!/usr/bin/env node

const start = require('./start').start;
const logger = require('./log').logger;
const help = require('./help').help;

const app = (key) => {
  switch(key){
    case 'start':
     start();
     break;
    case 'help':
    case undefined:
      help();
      break;
    case 'log': 
      logger.readLog();
      break;
  }
}

app(process.argv[2]);

