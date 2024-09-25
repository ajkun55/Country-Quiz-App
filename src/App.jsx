import { useEffect, useState } from "react";

import generateCountryQuiz from "./components/GenerateQuestions";
import Question from "./components/Question";
import Congrats from "./components/Congrats";

const App = () => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const quizQuestions = await generateCountryQuiz();
    setQuestions(quizQuestions);
  };

  useEffect(() => {
    fetchQuestions(); // Runs only once on mount
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState(Array(10).fill(""));
  const [quizEnd, setQuizEnd] = useState(false);
  const [answered, setAnswered] = useState(Array(10).fill(false));
  const [correct, setCorrect] = useState(Array(10).fill(false));
  const [score, setScore] = useState(0);

  function handleClick(question, option) {
    setSelectedOption(option);
    const updatedSelected = [...selectedOptions]; // Create a shallow copy of the array
    updatedSelected[question.id - 1] = option; // Update the correct index
    setSelectedOptions(updatedSelected); // Set the updated list

    const updatedCorrect = [...correct]; // Create a shallow copy to avoid mutating the original array
    updatedCorrect[question.id - 1] = option === question.answer; // Update the correct index (id starts from 1, so subtract 1)
    setCorrect(updatedCorrect); // Set the updated list
    const newScore = updatedCorrect.filter(Boolean).length;
    setScore(newScore);

    const updatedAnswered = [...answered]; // Create a shallow copy of the array
    updatedAnswered[question.id - 1] = true; // Update the correct index
    setAnswered(updatedAnswered); // Set the updated list

    if (updatedAnswered.every((a) => a)) {
      setTimeout(() => setQuizEnd(true), 2500);
    }
    setSelectedOption("");
  }

  const newQuiz = () => {
    setAnswered(Array(10).fill(false));
    setCorrect(Array(10).fill(false));
    setSelectedOption("");
    setSelectedOptions(Array(10).fill(""));
    setQuizEnd(false);
    setScore(0);
    setCurrentQuestion(0);
    fetchQuestions();
  };

  return (
    <main className="bg-[url('./assets/bg.jpg')] bg-no-repeat bg-cover min-h-screen text-light-gray grid place-content-center p-8">
      {!quizEnd ? (
        <div className="lg:w-[820px] lg:h-[440px] mx-auto px-8 py-12 bg-dark rounded-2xl">
          <h3 className="text-sm font-bold text-center text-gray">
            Country Quiz
          </h3>
          <div className="my-8 mx-auto max-w-[420px] lg:max-w-none flex flex-row flex-wrap gap-3 justify-center">
            {answered.map((a, i) => (
              <span
                key={i}
                onClick={() => setCurrentQuestion(i)}
                className={`cursor-pointer grid place-content-center w-11 h-11 rounded-full ${
                  a || currentQuestion === i ? "bg-lg" : "bg-darker"
                }`}
              >
                {i + 1}
              </span>
            ))}
          </div>
          <Question
            question={questions[currentQuestion]}
            selectedOption={selectedOption}
            selectedOptions={selectedOptions}
            handleClick={handleClick}
          />{" "}
        </div>
      ) : (
        <Congrats score={score} newQuiz={newQuiz} />
      )}
    </main>
  );
};

export default App;
