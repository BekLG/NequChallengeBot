require("dotenv").config();
const express=   require("express");
const { Bot, session } = require("grammy");
const { run } = require("@grammyjs/runner");
const { conversations, createConversation } = require("@grammyjs/conversations");
// const { keyboard } = require('./modules/keyboards');
const { RedisAdapter } = require('@grammyjs/storage-redis'); // Import RedisAdapter
const IORedis = require('ioredis');
const  Calendar = require('telegram-inline-calendar');


// Create an instance of the bot
const bot = new Bot(process.env.BOT_TOKEN);


bot.use(session({ initial: () => ({ 
    id: "", // User ID
    wakeUpTime: "", // User's Chosen Wake-Up Time
    pointsEarned: 10, // Points Earned, initially 10
    successfulWakeUps: 0, // Successful Wake-Ups
    missedWakeUps: 0, // Missed Wake-Ups
  }) }));



bot.command('help', (ctx) => {
    const helpMessage = `
    Welcome to Niku challenge Bot! Here are the available commands:
    - /start: Begin the setup process.
    - /settime: Set or update your wake-up time.
    - /checktime: Check your current wake-up time.
    - /motivate: Receive a motivational message.
    - /statistics: View your challenge statistics.
  
    `;
    ctx.reply(helpMessage);
  });
  



const calendar =new Calendar(bot, {
    date_format: 'HH:mm',
    language: 'en',
    bot_api: "grammy",
    time_range: "09:00-12:30",
    time_step: "15m"
});


// bot.on("callback_query:data", (ctx) => {
//     if (ctx.msg.message_id == calendar.chats.get(ctx.chat.id)) {
//         var res;
//         res = calendar.clickButtonCalendar(ctx.update.callback_query);
//         // console.log(ctx.update.callback_query);
//         if (res !== -1) {
//             // converting to date format
//             const selectedTime = res; 
//             const selectedTimeParts = selectedTime.split(':');
//             const hours = parseInt(selectedTimeParts[0]);
//             const minutes = parseInt(selectedTimeParts[1]);
//             const userWakeUpTime = new Date();
//             userWakeUpTime.setHours(hours);
//             userWakeUpTime.setMinutes(minutes);

//             ctx.session.wakeUpTime= userWakeUpTime;
//             ctx.reply("You selected: " + res);
//             console.log("selected time: ", ctx.session.wakeUpTime);

//             console.log("time: ", ctx.session.wakeUpTime.getHours());
//             console.log("minute: ", ctx.session.wakeUpTime.getMinutes());

//         }
//     }
// });

// bot.command('settime', ctx => calendar.startTimeSelector(ctx));

// bot.command('checktime', (ctx) =>
//     ctx.reply("you wake Up time is: "+ ctx.session.wakeUpTime.getHours()+ ":"+  ctx.session.wakeUpTime.getMinutes()+ " in Ethiopian time" )
//  );



bot.on("callback_query:data", (ctx) => {
    if (ctx.msg.message_id == calendar.chats.get(ctx.chat.id)) {
        var res;
        res = calendar.clickButtonCalendar(ctx.update.callback_query);
        if (res !== -1) {
            const selectedTime = res;

            // Split the selected time
            const selectedTimeParts = selectedTime.split(':');
            const hours = parseInt(selectedTimeParts[0]);
            const minutes = parseInt(selectedTimeParts[1]);

            // Create a Date object for Ethiopian time
            const ethiopianTime = new Date(selectedTime);
            ethiopianTime.setFullYear(new Date().getUTCFullYear()); // Set the year to the current year
            ethiopianTime.setMonth(new Date().getUTCMonth()); // Set the month to the current month
            ethiopianTime.setUTCMinutes(ethiopianTime.getUTCMinutes() + minutes);
            ethiopianTime.setUTCHours(ethiopianTime.getUTCHours() + hours);

            // Convert Ethiopian time to UTC
            const utcTime = new Date(ethiopianTime.getTime() - ethiopianTime.getTimezoneOffset() * 60000);

            // Store the UTC time in the session
            ctx.session.wakeUpTime = utcTime;

            // Reply to the user with the selected time
            ctx.reply("You selected: " + res);
            console.log("Selected time (Ethiopian time):", ethiopianTime);
            console.log("Selected time (UTC time):", utcTime.toISOString());
        }
    }
});

bot.command('settime', ctx => calendar.startTimeSelector(ctx));

bot.command('checktime', (ctx) => {
    // Convert UTC time to Ethiopian time for display
    const ethiopianTime = new Date(ctx.session.wakeUpTime);
    ctx.reply("Your wake-up time is: " + ethiopianTime.getUTCHours() + ":" + ethiopianTime.getUTCMinutes() + " (Ethiopian time)");
});





bot.command("start",(ctx)=> ctx.reply("hello there, i am niku bot"));


// Catch errors and log them
bot.catch((err) => console.error(err));

// Run it concurrently!
run(bot);
