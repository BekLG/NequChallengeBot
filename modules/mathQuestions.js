function generateMathQuestions() {
    const questions = [];

    for (let i = 0; i < 5; i++) {
        const num1 = Math.floor(Math.random() * 7) + 4;
        const num2 = Math.floor(Math.random() * 7) + 4;
        const num3 = Math.floor(Math.random() * 7) + 4;

        const operator1 = '*';
        const operator2 = '+';

        const question = `${num1} ${operator1} ${num2} ${operator2} ${num3}`;

        // Calculate the answer for the question
        const answer = eval(question);

        // Store the question and its answer as an object in the array
        questions.push({
            question: question,
            answer: answer,
        });
    }

    return questions;
}

module.exports = generateMathQuestions;
