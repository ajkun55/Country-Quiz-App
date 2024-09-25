import CongratsImg from "../assets/congrats.svg";

function Congrats({ score, newQuiz }) {
  return (
    <div className="max-w-[400px] mx-auto text-center bg-darker rounded-2xl p-8">
      <img src={CongratsImg} alt="" />
      <h1 className="text-2xl font-medium my-5">
        Congrats! You completed the quiz.
      </h1>
      <p className="text-base font-medium my-3">
        You answered {score}/10 correctly
      </p>
      <button
        onClick={newQuiz}
        className="text-base font-medium bg-lg py-3 w-60 rounded-lg my-8"
      >
        Play Again
      </button>
    </div>
  );
}

export default Congrats;
