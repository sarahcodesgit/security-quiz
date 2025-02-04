const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const questions = [
  {
    question: "What is the most common form of phishing attack?",
    options: ["Email phishing", "SMiShing", "Vishing", "Malware Injection"],
    answer: "Email phishing",
  },
  {
    question: "Which is the strongest password?",
    options: ["123456", "password", "P@ssw0rd!", "Qw3rTy!2024"],
    answer: "Qw3rTy!2024",
  },
];

app.get("/questions", (req, res) => {
  res.json(questions);
});

app.post("/submit", (req, res) => {
  const userAnswers = req.body.answers;
  let score = 0;

  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) score++;
  });

  res.json({ score });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
