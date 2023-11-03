


// Your function to check and trigger when it's time to wake up
function checkAndTriggerWakeUp(ctx) {
    // Get the current UTC time
    console.log("checkAndTriggerWakeUp started");
    const currentTime = new Date();

    // Assume you have the user's UTC wake-up time stored in the session
    const userWakeUpTime = ctx.session.wakeUpTime;

    // Compare the current time with the user's wake-up time
    if (currentTime.getTime() === userWakeUpTime.getTime()) {
        // It's time to wake up, trigger your wake-up function here
        console.log("It's time to wake up!");
        // Call your wake-up function or send a wake-up message to the user
        // Example: ctx.reply("Good morning! It's time to start your day.");
    }
    else{
        console.log("it is not the time for: ", ctx.session.wakeUpTime)
    }
}

// Set the interval to check every minute (adjust the interval as needed)
// const interval = setInterval(checkAndTriggerWakeUp(ctx), 10 * 1000); // 60 seconds x 1000 milliseconds = 1 minute

// Stop the interval if needed (e.g., when the bot is stopped or the user changes their wake-up time)
// clearInterval(interval); // Call this when you want to stop checking


module.exports = {checkAndTriggerWakeUp};