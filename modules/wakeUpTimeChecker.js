const {InlineKeyboard } = require("grammy");
// const {AskQuestions}= require('') // import ask questions function

const inlineKeyboard = new InlineKeyboard()
  .text("Yes!", "AskQuestions");

// Your function to check and trigger when it's time to wake up

function checkAndTriggerWakeUp(ctx, bot) {

     /////// call back query
     bot.callbackQuery('AskQuestions', (ctx) => {
        console.log("inside AskQuestions");
        ctx.reply("here are 5 questions to prove that you are awake.");
        });

    // Get the current UTC time
    console.log("checkAndTriggerWakeUp started");
// Get the current time as a JavaScript Date object

const currentTime = new Date();

    //user's UTC wake-up time stored in the session
    const savedUserWakeUpTime = ctx.session.wakeUpTime;

    // Convert the saved time string to a JavaScript Date object
const userWakeUpTime = new Date(savedUserWakeUpTime);

    // Compare the current time with the user's wake-up time
    if( currentTime.getHours()-6 == userWakeUpTime.getHours() && currentTime.getMinutes() === userWakeUpTime.getMinutes()) {
        // It's time to wake up, trigger your wake-up function here
        console.log("It's time to wake up!");
        ctx.reply("It's time to Wake Up!! \n\n  Are You Awake?", { reply_markup: inlineKeyboard,});

       
    }
    else{
        console.log("it is not the time for: ", ctx.session.wakeUpTime)

        console.log("current time:", currentTime.getHours()-6,":", currentTime.getMinutes() ,"saved time:  ",userWakeUpTime.getHours(), ":", userWakeUpTime.getMinutes());
    }
}





module.exports = {checkAndTriggerWakeUp};