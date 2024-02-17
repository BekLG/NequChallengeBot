require("dotenv").config();
const express=   require("express");
const { Bot, session } = require("grammy");
const { run } = require("@grammyjs/runner");
const { conversations, createConversation } = require("@grammyjs/conversations");
// const { keyboard } = require('./modules/keyboards');
const {checkAndTriggerWakeUp} = require('./modules/wakeUpTimeChecker.js')
const { RedisAdapter } = require('@grammyjs/storage-redis'); // Import RedisAdapter
const IORedis = require('ioredis');
const  Calendar = require('telegram-inline-calendar');


// Create an instance of the bot
const bot = new Bot(process.env.BOT_TOKEN);


bot.use(session({ initial: () => ({ 
    id: "", // User ID
    pointsEarned: 0, // Points Earned, initially 0
    successfulWakeUps: 0, // Successful Wake-Ups
    missedWakeUps: 0, // Missed Wake-Ups
  }) }));


bot.command('help', (ctx) => {
    const helpMessage = `
    Welcome to Niku challenge Bot! Here are the available commands:
    - /start: Begin the setup process.
    - /motivate: Receive a motivational message.
    - /statistics: View your challenge statistics.
  
    `;
    ctx.reply(helpMessage);
  });



// bot.on("callback_query:data", (ctx) => {
//     if (ctx.msg.message_id == calendar.chats.get(ctx.chat.id)) {
//         var res;
//         res = calendar.clickButtonCalendar(ctx.update.callback_query);
//         if (res !== -1) {
//             const selectedTime = res;

//             // Split the selected time
//             const selectedTimeParts = selectedTime.split(':');
//             const hours = parseInt(selectedTimeParts[0]);
//             const minutes = parseInt(selectedTimeParts[1]);

//             const wakeupTime = new Date();
//             wakeupTime.setHours(hours);
//             wakeupTime.setMinutes(minutes);

//             ctx.session.wakeUpTime = wakeupTime;


//             // Reply to the user with the selected time
//             ctx.reply("You selected: " + res);
//             // console.log("Selected time (Ethiopian time):", ethiopianTime);
//             console.log("Selected time:", wakeupTime.toTimeString());

            

//         }
//     }
// });


bot.command("start",(ctx)=> {
    // setInterval(() => checkAndTriggerWakeUp(ctx, bot), 60 * 1000); // check the time every minute.
    setInterval(() => checkAndTriggerWakeUp(ctx, bot), 60 * 100); // for dev mode.

    ctx.reply("hello there, i am niku bot");
} )


// Catch errors and log them
bot.catch((err) => console.error(err));

// Run it concurrently!
run(bot);
