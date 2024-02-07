const cron = require('node-cron');



function myScheduledFunction() {
    const istDateTime = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
  console.log('Task executed at:', istDateTime);

}

// Schedule the task to run every day at 6 PM
cron.schedule('0 13 * * *', () => {
  myScheduledFunction();
}, { timezone: 'Asia/Kolkata' });

module.exports = { myScheduledFunction };