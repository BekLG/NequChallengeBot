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


bot.on("callback_query:data", (ctx) => {
    if (ctx.msg.message_id == calendar.chats.get(ctx.chat.id)) {
        var res;
        res = calendar.clickButtonCalendar(ctx.update.callback_query);
        // console.log(ctx.update.callback_query);
        if (res !== -1) {
            ctx.reply("You selected: " + res);
        }
    }
});

bot.command('settime', ctx => calendar.startTimeSelector(ctx))

bot.command("start",(ctx)=> ctx.reply("hello there, i am niku bot"));


// Catch errors and log them
bot.catch((err) => console.error(err));

// Run it concurrently!
run(bot);
