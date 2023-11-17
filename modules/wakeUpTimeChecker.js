const {InlineKeyboard } = require("grammy");
// const {AskQuestions}= require('') // import ask questions function

const inlineKeyboard = new InlineKeyboard()
  .text("Yes!", "AskQuestions");

// Your function to check and trigger when it's time to wake up
function checkAndTriggerWakeUp(ctx) {
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

// Set the interval to check every minute (adjust the interval as needed)
// const interval = setInterval(checkAndTriggerWakeUp(ctx), 10 * 1000); // 60 seconds x 1000 milliseconds = 1 minute

// Stop the interval if needed (e.g., when the bot is stopped or the user changes their wake-up time)
// clearInterval(interval); // Call this when you want to stop checking


module.exports = {checkAndTriggerWakeUp};