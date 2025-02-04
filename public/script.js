async function loadQuiz() {
    const response = await fetch("http://localhost:5000/questions");
    const questions = await response.json();

    const quizDiv = document.getElementById("quiz");
    quizDiv.innerHTML = "";

    questions.forEach((q, index) => {
        let questionBlock = `<h3>${q.question}</h3>`;
        q.options.forEach(option => {
            questionBlock += `
                <input type="radio" name="q${index}" value="${option}"> ${option}<br>
            `;
        });
        quizDiv.innerHTML += questionBlock;
    });
}

async function submitQuiz() {
    const answers = [];
    const radios = document.querySelectorAll("input[type=radio]:checked");

    radios.forEach(radio => answers.push(radio.value));

    const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers })
    });

    const result = await response.json();
    document.getElementById("result").innerText = `Your score: ${result.score}`;
}

loadQuiz();
