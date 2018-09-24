const shell = require('shelljs');
const CronJob = require('cron').CronJob


const job = new CronJob('0 20 21 * * *', ()=>{
  shell.exec('/home/pi/my-scripts/wakeUpMe.sh')
});

module.exports = job;