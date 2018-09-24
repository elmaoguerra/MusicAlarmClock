const express = require('express');
const app = express();
const moment = require('moment');
const shell = require('shelljs');
const text = require('./src/text-to-speech');

const job = require('./src/cronjob');

app.get('/welcome', function(req, res){
  text.convert('welcome', 'Welcome to Music Alarm Clock');
});

app.get('/stopAlarm', function(req, res){
   shell.exec('killall mplayer');
   job.stop();
   res.send('Alarma detenida');
});

app.get('/alarmclock', function (req, res) {
  const num = req.params.next || 1;
  const nextDates = job.nextDates(num);
  let nextAlarms = ['Next Alarm sounds:']
  nextDates.forEach(element => {
    const date = moment(element);
    let alarm = {
      relative: date.fromNow(),
      absolute: date.format('MMMM Do YYYY, h:mm:ss a')
    };
    nextAlarms.push(alarm);
  });
  res.send(nextAlarms);
});


app.get('/greeting', function (req, res) {
  const name = req.params.name || 'Mauricio';
  const now = moment().format('MMMM Do YYYY, h:mm:ss a'); // September 23rd 2018, 4:39:50 pm

  const greet = `Hi ${name}, today is: ${now}`;
  text.convert('greet', greet);
  res.send(greet);
});

app.listen(3000, function () {
  job.start();
  console.log('Example app listening on port 3000!');
});

