// Import the function directly without destructuring
const generateMathQuestions = require('./mathQuestions');

// Call the function
const mathQuestions = generateMathQuestions();

async function askQuestions(conversation, ctx) {
    
    // Use mathQuestions array as needed
    console.log("Math questions: ", mathQuestions);

    // Iterate through each question
    for (let i = 0; i < mathQuestions.length; i++) {
        let isCorrect = false; // Flag to track if the answer is correct
        // Repeat the question until the correct answer is provided
        while (!isCorrect) {
            // Send the question to the user
            await ctx.reply(mathQuestions[i].question);
            // Wait for the user's response
            const response = await conversation.form.text();
            // Check if the response is correct
            console.log(parseInt(response)," : ", mathQuestions[i].answer);
            if (parseInt(response) == mathQuestions[i].answer) {
                isCorrect = true;
                await ctx.reply("Correct! Let's move to the next question.");
            } else {
                await ctx.reply("Incorrect. Please try again with the correct answer.");
            }
        }
    }
    
    await ctx.reply("Congratulations! You've answered all questions correctly.");
    // conversation.session.pointsEarned +=1;
    // conversation.session.successfulWakeUps +=1;
    // set wakeUp flag true
    conversation.session.awake= true;

    console.log("points earned: ",conversation.session.pointsEarned);
}

module.exports = { askQuestions };