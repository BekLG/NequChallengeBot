const {InlineKeyboard } = require("grammy");
const { conversations, createConversation } = require("@grammyjs/conversations");

const {askQuestions}= require('./askQuestions') // import ask questions conversation

const inlineKeyboard = new InlineKeyboard()
  .text("Yes!", "AskQuestions");

// Your function to check and trigger when it's time to wake up

function checkAndTriggerWakeUp(ctx, bot) {

        // Install the conversations plugin.
  bot.use(conversations());
  
  // Create conversation handlers
  bot.use(createConversation(askQuestions));

     /////// call back query
     bot.callbackQuery('AskQuestions', async (ctx) => {
        // console.log("inside AskQuestions");
        ctx.reply("here are 5 MATHS questions to prove that you are awake.");
        // askQuestions(ctx, bot);
        await ctx.conversation.enter("askQuestions");
        });

    // Get the current UTC time
    console.log("checkAndTriggerWakeUp started");

// Get the current time as a JavaScript Date object
const currentTime = new Date();

    const wakeUpTime = "13:10";
    const wakeUpDeadline= "13:11"


    // Split the wakeUpTime string into hours and minutes
    const [hours, minutes] = wakeUpTime.split(":");
    // Create a new Date object with the current date and the specified wake-up time
    const userWakeUpTime = new Date();
    userWakeUpTime.setHours(parseInt(hours));
    userWakeUpTime.setMinutes(parseInt(minutes));
    console.log("User wake up time ", userWakeUpTime);

    // Split the wakeUpDeadline string into hours and minutes
    const [deadlineHours, deadlineMinutes] = wakeUpDeadline.split(":");
    // Create a new Date object with the current date and the specified wake-up deadline
    const userWakeUpDeadline = new Date();
    userWakeUpDeadline.setHours(parseInt(deadlineHours));
    userWakeUpDeadline.setMinutes(parseInt(deadlineMinutes));
    console.log("User wake-up deadline ", userWakeUpDeadline);


    // Compare the current time with the user's wake-up time
    if( currentTime.getHours() == userWakeUpTime.getHours() && currentTime.getMinutes() === userWakeUpTime.getMinutes()) {
        // It's time to wake up, trigger your wake-up function here
        console.log("It's time to wake up!");
        ctx.reply("It's time to Wake Up!! \n\n  Are You Awake?", { reply_markup: inlineKeyboard,});

        // set wakeUp flag false
        ctx.session.awake= false;
       
    }
    else if(currentTime.getHours() == userWakeUpDeadline.getHours() && currentTime.getMinutes() === userWakeUpDeadline.getMinutes()){
        console.log("deadline arrived, wakeup status: ", ctx.session.awake);

        //check if the user have not answered the questions and decrement pointsEarned
        if (!ctx.session.awake) {
            ctx.session.pointsEarned -=1;
            ctx.session.missedWakeUps +=1;
        }
        else{
            ctx.session.pointsEarned +=1;
            ctx.session.successfulWakeUps +=1;
        }
    }
    else{
        console.log("it is not the time for: ", wakeUpTime)

        console.log("current time:", currentTime.getHours(),":", currentTime.getMinutes() ,"saved time:  ",userWakeUpTime.getHours(), ":", userWakeUpTime.getMinutes());
        console.log("Status: ", "awake: ", ctx.session.awake,"  points: ",ctx.session.pointsEarned );
    }
}


module.exports = {checkAndTriggerWakeUp};