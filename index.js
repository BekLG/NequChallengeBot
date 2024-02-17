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
    time_range: "02:25-3:30",
    time_step: "1m"
});



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

            const wakeupTime = new Date();
            wakeupTime.setHours(hours);
            wakeupTime.setMinutes(minutes);

            ctx.session.wakeUpTime = wakeupTime;


            // Reply to the user with the selected time
            ctx.reply("You selected: " + res);
            // console.log("Selected time (Ethiopian time):", ethiopianTime);
            console.log("Selected time:", wakeupTime.toTimeString());

            setInterval(() => checkAndTriggerWakeUp(ctx, bot), 60 * 1000);

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
