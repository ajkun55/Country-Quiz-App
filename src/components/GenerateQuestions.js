async function generateCountryQuiz() {
  try {
    // Fetch country data from the API
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();

    const quizQuestions = [];

    // Shuffle countries to ensure randomness
    const shuffledCountries = countries.sort(() => 0.5 - Math.random());

    // Helper function to generate unique incorrect options
    function getRandomOptions(correctAnswer, possibleOptions, count = 3) {
      const options = [];
      while (options.length < count) {
        const randomIndex = Math.floor(Math.random() * possibleOptions.length);
        const option = possibleOptions[randomIndex];
        if (option !== correctAnswer && !options.includes(option)) {
          options.push(option);
        }
      }
      return options;
    }

    // Format population number (e.g., 1.2M, 3.4B)
    function formatPopulation(population) {
      if (population >= 1e9) return (population / 1e9).toFixed(1) + "B";
      if (population >= 1e6) return (population / 1e6).toFixed(1) + "M";
      return population.toString();
    }

    // Generate 10 quiz questions
    for (let i = 0; i < 10; i++) {
      const country = shuffledCountries[i];
      const questionType = Math.floor(Math.random() * 5); // Randomize question type (5 types)
      let question = "";
      let answer = "";
      let options = [];

      switch (questionType) {
        case 0:
          // Question type: "What is the capital of {country}?"
          question = `What is the capital of ${country.name.common}?`;
          answer = country.capital ? country.capital[0] : "No capital"; // Handle missing capital
          options = [
            answer,
            ...getRandomOptions(
              answer,
              countries.map((c) => (c.capital ? c.capital[0] : "No capital"))
            ),
          ];
          break;
        case 1:
          // Question type: "Which region does {country} belong to?"
          question = `Which region does ${country.name.common} belong to?`;
          answer = country.region;
          options = [
            answer,
            ...getRandomOptions(
              answer,
              countries.map((c) => c.region)
            ),
          ];
          break;
        case 2: {
          // Question type: "Which language is spoken in {country}?"
          const languages = country.languages
            ? Object.values(country.languages)
            : ["No official language"];
          question = `Which language is spoken in ${country.name.common}?`;
          answer = languages[0];
          options = [
            answer,
            ...getRandomOptions(
              answer,
              countries.flatMap((c) =>
                c.languages
                  ? Object.values(c.languages)
                  : ["No official language"]
              )
            ),
          ];
          break;
        }
        case 3: {
          // Question type: "What is the currency used in {country}?"
          const currencies = country.currencies
            ? Object.values(country.currencies).map((curr) => curr.name)
            : ["No currency"];
          question = `What is the currency used in ${country.name.common}?`;
          answer = currencies[0];
          options = [
            answer,
            ...getRandomOptions(
              answer,
              countries.flatMap((c) =>
                c.currencies
                  ? Object.values(c.currencies).map((curr) => curr.name)
                  : ["No currency"]
              )
            ),
          ];
          break;
        }
        case 4: {
          // Question type: "What is the approximate population of {country}?"
          const population = country.population || 0;
          question = `What is the approximate population of ${country.name.common}?`;
          answer = formatPopulation(population);
          options = [
            answer,
            ...getRandomOptions(
              answer,
              countries.map((c) => formatPopulation(c.population || 0))
            ),
          ];
          break;
        }
        default:
          break;
      }

      // Shuffle options for randomness
      options = options.sort(() => 0.5 - Math.random());

      // Create the quiz question object
      const quizQuestion = {
        id: i + 1,
        question: question,
        options: options,
        answer: answer,
      };

      quizQuestions.push(quizQuestion);
    }

    // console.log(quizQuestions);
    return quizQuestions;
  } catch (error) {
    console.error("Error generating quiz:", error);
  }
}

export default generateCountryQuiz;

// Call the function to generate the quiz
// const questions = generateCountryQuiz();

// export default questions;
