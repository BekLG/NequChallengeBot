// Import the function directly without destructuring
const generateMathQuestions = require('./mathQuestions');


async function askQuestions(ctx, bot) {
    // Call the function
const mathQuestions = generateMathQuestions();
// Use mathQuestions array as needed
    console.log("Math questions: ",mathQuestions);

    for (let i = 0; i < mathQuestions.length; i++) {
        const question = mathQuestions[i].question;
        const answer = mathQuestions[i].answer;
        var response="";

        // Send the question to the user
        await ctx.reply(question);
        
        // console.log("ctx: ", ctx);
        // console.log("ctx.update: " , ctx.update.callback_query.message.text);
        // console.log("ctx.message.text: " , ctx.message.text);

        // Wait for the user's response

        bot.on("message", async (ctx) => {
            response = await ctx.message.text;       
          });

          // Check if the response is correct
        if (parseInt(response.text) === answer) {
            await ctx.reply("Correct! Let's move to the next question.");
        } else {
            await ctx.reply("Incorrect. Please try again with the correct answer.");
            // Decrement i to repeat the current question
            i--;
        }
        
    }
    
    await ctx.reply("Congratulations! You've answered all questions correctly.");
}

module.exports = askQuestions;