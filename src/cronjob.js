const shell = require('shelljs');
const CronJob = require('cron').CronJob


const job = new CronJob('0 15 22 * * *', ()=>{
  shell.exec('/home/pi/my-scripts/wakeUpMe.sh', {async:true})
});

module.exports = job;
