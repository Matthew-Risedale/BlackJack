const fs = require('fs');
const deck = require('./deck').deck;
const logger = require('./log').logger;

const start = () => {

  logger.writeLog(new Date() + '\n');
  let newDeck = deck;
  let cards = [];
  let scores = 0;
  let dealerScores;
  

  getCard = () => {
    let cardNumber = Math.round(Math.random() * (newDeck.length - 1));
    cards.push(newDeck[cardNumber]);
    logger.writeLog(`${newDeck[cardNumber].value} ${newDeck[cardNumber].symbol} \n`);
    newDeck.splice(cardNumber, 1);
  };

  getScores = () => {
    scores = 0;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].value == 'KING' || 
          cards[i].value == 'QUEEN'|| 
          cards[i].value == 'JACK') {
        scores = scores + 10;
      }else if(cards[i].value === 'ACE') {
        scores+11 > 21 ? scores = scores + 1 : scores = scores + 11;
      }else{
        scores=scores+parseInt(cards[i].value);
      }
    }
    console.log(`Scores: ${scores}`);
    if(scores > 21) {
      console.log('YOU LOSE');
      logger.writeLog(`Scores: ${scores} \n`);
      logger.writeLog('Lose'+'\n', () => {
        console.log('results have been saved!');
        process.exit();
      })
    }
  };

  outInfo = () => {
    for (let i = 0; i < cards.length; i++) {
      console.log(`${cards[i].value} ${cards[i].symbol}`);
    }
    getScores();
  };

  dealer = () => {
    dealerScores = Math.round(Math.random() * 10) + 16;
    console.log(`Dealer scores: ${dealerScores}`);
    console.log(`Your scores: ${scores}`);
    logger.writeLog(`Scores: ${scores} \n`);
    logger.writeLog(`Dealer scores: ${dealerScores} \n`);
  };

  scoresCompare = () => {
    if(scores == dealerScores && scores == 21) {
      console.log('Standoff');
      logger.writeLog('Standoff'+'\n', () => {
        console.log('results have been saved!');
        process.exit();
      })
    }else if(scores > dealerScores){
      console.log('You Win!');
      logger.writeLog('Win'+'\n', () => {
        console.log('results have been saved!');
        process.exit();
      })
    } else{
      console.log('Lose');
      logger.writeLog('Lose'+'\n', () => {
        console.log('results have been saved!');
        process.exit();
      })
    }
  }


  process.stdout.write('here your cards > \n');
  getCard();
  getCard();
  outInfo();

  process.stdout.write('do you want more? > ')

  process.stdin.on('data', data => {

    switch (data.toString().trim()) {
      case 'yes':
        getCard();
        outInfo();
        if(scores<21) process.stdout.write('do you want more? > ');
        break;
      case 'no':
        dealer();
        scoresCompare();
        break;
    }
  })
}

exports.start = start;