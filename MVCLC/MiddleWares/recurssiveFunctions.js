// const cron = require('node-cron');
// const AppointmentModels = require('../Models/AppointmentModels');



// // function myScheduledFunction() {
// //     const istDateTime = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
// //   console.log('Task executed at:', istDateTime);

// // }

// async function getTodsaysAppointment(){
//   console.log('Task executed at:');
//   var query = { address: "Park Lane 38" };
//   var data = await AppointmentModels.find().where();
//   console.log(data.length);

// }

// // Schedule the task to run every day at 6 PM
// cron.schedule('* * * * *', () => {
//   // myScheduledFunction();
//   getTodsaysAppointment();
// }, { timezone: 'Asia/Kolkata' });

// module.exports = { getTodsaysAppointment};