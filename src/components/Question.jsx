import Check from "../assets/Check_round_fill.svg";
import Close from "../assets/Close_round_fill.svg";

function Question({ question, selectedOption, selectedOptions, handleClick }) {
  return (
    question && (
      <div>
        <h2 className=" font-semibold text-xl text-center my-10">
          {question.question}
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-[504px] mx-auto">
          {question.options.map((option, index) => (
            <span
              key={index}
              onClick={() => handleClick(question, option)}
              className={`${
                selectedOption === option ||
                selectedOptions[question.id - 1] === option
                  ? "bg-lg"
                  : "bg-darker"
              } cursor-pointer font-semibold text-base flex justify-center items-center gap-3 w-60 h-14 rounded-xl hover:bg-lg mx-auto`}
            >
              {option}
              <img
                src={Check}
                alt=""
                className={`${
                  (selectedOption === option ||
                    selectedOptions[question.id - 1] === option) &&
                  option === question.answer
                    ? "block"
                    : "hidden"
                } w-5 h-5`}
              />
              <img
                src={Close}
                alt=""
                className={`${
                  (selectedOption === option ||
                    selectedOptions[question.id - 1] === option) &&
                  option !== question.answer
                    ? "block"
                    : "hidden"
                } w-5 h-5`}
              />
            </span>
          ))}
        </div>
      </div>
    )
  );
}

export default Question;
