document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

    const quizQuestions = [
        {
            question: "Qual é a capital da França?",
            answers: {
                a: "Madrid",
                b: "Paris",
                c: "Berlim"
            },
            correctAnswer: "b"
        },
        {
            question: "Quem escreveu 'Dom Quixote'?",
            answers: {
                a: "Miguel de Cervantes",
                b: "William Shakespeare",
                c: "J.K. Rowling"
            },
            correctAnswer: "a"
        },
        {
            question: "Qual é o maior planeta do nosso sistema solar?",
            answers: {
                a: "Terra",
                b: "Marte",
                c: "Júpiter"
            },
            correctAnswer: "c"
        }
    ];

    function buildQuiz() {
        const output = [];

        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} : ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            output.push(
                `<div class="question">${currentQuestion.question}</div>
                <div class="answers">${answers.join('')}</div>`
            );
        });

        quizContainer.innerHTML = output.join('');
    }

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll('.answers');
        let numCorrect = 0;

        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
                answerContainers[questionNumber].style.color = 'green';
            } else {
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        resultsContainer.innerHTML = `Você acertou ${numCorrect} de ${quizQuestions.length} questões.`;
    }

    buildQuiz();

    submitButton.addEventListener('click', showResults);
});
