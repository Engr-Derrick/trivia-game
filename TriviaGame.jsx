import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, Flame, Volume2, VolumeX } from 'lucide-react';

const TriviaGame = () => {
  const allTriviaQuestions = [
    // EASY TRIVIA (1-25)
    { id: 1, question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2, difficulty: 1, category: "Geography", type: "trivia" },
    { id: 2, question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1, difficulty: 1, category: "Science", type: "trivia" },
    { id: 3, question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], correct: 3, difficulty: 1, category: "Geography", type: "trivia" },
    { id: 4, question: "Who wrote 'Romeo and Juliet'?", options: ["Jane Austen", "William Shakespeare", "Charles Dickens", "Mark Twain"], correct: 1, difficulty: 1, category: "Literature", type: "trivia" },
    { id: 5, question: "What is the smallest country in the world?", options: ["Monaco", "Liechtenstein", "Vatican City", "Malta"], correct: 2, difficulty: 1, category: "Geography", type: "trivia" },
    { id: 6, question: "How many sides does a hexagon have?", options: ["4", "5", "6", "8"], correct: 2, difficulty: 1, category: "Math", type: "trivia" },
    { id: 7, question: "What color is the sky on a clear day?", options: ["Green", "Blue", "Yellow", "Red"], correct: 1, difficulty: 1, category: "Nature", type: "trivia" },
    { id: 8, question: "Which animal is known as the 'King of the Jungle'?", options: ["Tiger", "Elephant", "Lion", "Bear"], correct: 2, difficulty: 1, category: "Animals", type: "trivia" },
    { id: 9, question: "What is the chemical symbol for Gold?", options: ["Go", "Gd", "Au", "Ag"], correct: 2, difficulty: 1, category: "Science", type: "trivia" },
    { id: 10, question: "In what year did the Titanic sink?", options: ["1905", "1912", "1920", "1898"], correct: 1, difficulty: 1, category: "History", type: "trivia" },
    { id: 11, question: "What is the largest mammal in the world?", options: ["African Elephant", "Giraffe", "Blue Whale", "Hippopotamus"], correct: 2, difficulty: 1, category: "Animals", type: "trivia" },
    { id: 12, question: "How many continents are there?", options: ["5", "6", "7", "8"], correct: 2, difficulty: 1, category: "Geography", type: "trivia" },
    { id: 13, question: "What is the hardest natural substance on Earth?", options: ["Gold", "Diamond", "Platinum", "Iron"], correct: 1, difficulty: 1, category: "Science", type: "trivia" },
    { id: 14, question: "Who was the first President of the United States?", options: ["Thomas Jefferson", "George Washington", "John Adams", "James Madison"], correct: 1, difficulty: 1, category: "History", type: "trivia" },
    { id: 15, question: "What is the chemical symbol for Water?", options: ["W", "H2O", "HO", "O2"], correct: 1, difficulty: 1, category: "Chemistry", type: "trivia" },
    { id: 16, question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correct: 1, difficulty: 1, category: "Geography", type: "trivia" },
    { id: 17, question: "How many bones does an adult human have?", options: ["186", "206", "226", "246"], correct: 1, difficulty: 1, category: "Biology", type: "trivia" },
    { id: 18, question: "What is the capital of Japan?", options: ["Osaka", "Kyoto", "Tokyo", "Yokohama"], correct: 2, difficulty: 1, category: "Geography", type: "trivia" },
    { id: 19, question: "Which fruit is known as the 'King of Fruits'?", options: ["Mango", "Banana", "Apple", "Orange"], correct: 0, difficulty: 1, category: "Nature", type: "trivia" },
    { id: 20, question: "How many strings does a guitar typically have?", options: ["4", "6", "8", "10"], correct: 1, difficulty: 1, category: "Music", type: "trivia" },
    { id: 21, question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correct: 2, difficulty: 1, category: "Geography", type: "trivia" },
    { id: 22, question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3, difficulty: 1, category: "Geography", type: "trivia" },
    { id: 23, question: "How many days are in a leap year?", options: ["364", "365", "366", "367"], correct: 2, difficulty: 1, category: "Time", type: "trivia" },
    { id: 24, question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], correct: 2, difficulty: 1, category: "Math", type: "trivia" },
    { id: 25, question: "Which country is home to the Statue of Liberty?", options: ["France", "United States", "Italy", "Germany"], correct: 1, difficulty: 1, category: "Geography", type: "trivia" },

    // SPELLING QUESTIONS (26-40)
    { id: 26, question: "Which spelling is CORRECT?", options: ["Separate", "Seperate", "Seperete", "Seperete"], correct: 0, difficulty: 1, category: "Spelling", type: "spelling" },
    { id: 27, question: "Which spelling is CORRECT?", options: ["Neccessary", "Necessary", "Neccessery", "Necesary"], correct: 1, difficulty: 1, category: "Spelling", type: "spelling" },
    { id: 28, question: "Which spelling is CORRECT?", options: ["Ocassion", "Ocasion", "Occasion", "Occassion"], correct: 2, difficulty: 1, category: "Spelling", type: "spelling" },
    { id: 29, question: "Which spelling is CORRECT?", options: ["Acommodate", "Accommodate", "Accomodate", "Acommodate"], correct: 1, difficulty: 1, category: "Spelling", type: "spelling" },
    { id: 30, question: "Which spelling is CORRECT?", options: ["Definately", "Defintely", "Definitely", "Definately"], correct: 2, difficulty: 1, category: "Spelling", type: "spelling" },
    { id: 31, question: "Which spelling is CORRECT?", options: ["Recieve", "Receive", "Recieve", "Receve"], correct: 1, difficulty: 1, category: "Spelling", type: "spelling" },
    { id: 32, question: "Which spelling is CORRECT?", options: ["Begining", "Beginning", "Begining", "Beging"], correct: 1, difficulty: 1, category: "Spelling", type: "spelling" },
    { id: 33, question: "Which spelling is CORRECT?", options: ["Occured", "Occurred", "Ocurred", "Occured"], correct: 1, difficulty: 1, category: "Spelling", type: "spelling" },
    { id: 34, question: "Which spelling is CORRECT?", options: ["Sincere", "Sinceer", "Sincear", "Sincer"], correct: 0, difficulty: 1, category: "Spelling", type: "spelling" },
    { id: 35, question: "Which spelling is CORRECT?", options: ["Diferent", "Different", "Diffrent", "Diferent"], correct: 1, difficulty: 1, category: "Spelling", type: "spelling" },
    { id: 36, question: "Which spelling is CORRECT?", options: ["Realy", "Really", "Realy", "Realy"], correct: 1, difficulty: 1, category: "Spelling", type: "spelling" },
    { id: 37, question: "Which spelling is CORRECT?", options: ["Suprize", "Surprise", "Suprise", "Surpise"], correct: 1, difficulty: 1, category: "Spelling", type: "spelling" },
    { id: 38, question: "Which spelling is CORRECT?", options: ["Descibe", "Describe", "Discribe", "Describve"], correct: 1, difficulty: 1, category: "Spelling", type: "spelling" },
    { id: 39, question: "Which spelling is CORRECT?", options: ["Practise", "Practice", "Practise", "Practce"], correct: 1, difficulty: 1, category: "Spelling", type: "spelling" },
    { id: 40, question: "Which spelling is CORRECT?", options: ["Advise", "Advice", "Advise", "Advce"], correct: 0, difficulty: 1, category: "Spelling", type: "spelling" },

    // MEDIUM TRIVIA (41-75)
    { id: 41, question: "Who painted the Mona Lisa?", options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"], correct: 1, difficulty: 2, category: "Art", type: "trivia" },
    { id: 42, question: "What is the currency of Japan?", options: ["Won", "Yuan", "Yen", "Ringgit"], correct: 2, difficulty: 2, category: "Economics", type: "trivia" },
    { id: 43, question: "Which country is home to the Great Wall?", options: ["Japan", "China", "Korea", "Mongolia"], correct: 1, difficulty: 2, category: "Geography", type: "trivia" },
    { id: 44, question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "600,000 km/s", "100,000 km/s"], correct: 0, difficulty: 2, category: "Science", type: "trivia" },
    { id: 45, question: "How many strings does a violin have?", options: ["4", "5", "6", "8"], correct: 0, difficulty: 2, category: "Music", type: "trivia" },
    { id: 46, question: "What is the LARGEST DESERT in the world?", options: ["Sahara Desert", "Kalahari Desert", "Gobi Desert", "Antarctica"], correct: 0, difficulty: 2, category: "Geography", type: "trivia" },
    { id: 47, question: "What is the most spoken language in the world?", options: ["Spanish", "English", "Mandarin Chinese", "Hindi"], correct: 2, difficulty: 2, category: "Culture", type: "trivia" },
    { id: 48, question: "Which Shakespeare play features the character Othello?", options: ["Hamlet", "Othello", "Macbeth", "Romeo and Juliet"], correct: 1, difficulty: 2, category: "Literature", type: "trivia" },
    { id: 49, question: "What is the atomic number of Carbon?", options: ["4", "6", "8", "12"], correct: 1, difficulty: 2, category: "Chemistry", type: "trivia" },
    { id: 50, question: "Which planet has the most moons?", options: ["Saturn", "Jupiter", "Uranus", "Neptune"], correct: 1, difficulty: 2, category: "Science", type: "trivia" },
    { id: 51, question: "What is the capital of Brazil?", options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], correct: 2, difficulty: 2, category: "Geography", type: "trivia" },
    { id: 52, question: "Who invented the telephone?", options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "George Westinghouse"], correct: 1, difficulty: 2, category: "History", type: "trivia" },
    { id: 53, question: "What is the main ingredient in guacamole?", options: ["Tomato", "Avocado", "Lime", "Onion"], correct: 1, difficulty: 2, category: "Food", type: "trivia" },
    { id: 54, question: "Which country is not part of the United Kingdom?", options: ["Scotland", "Wales", "Ireland", "England"], correct: 2, difficulty: 2, category: "Geography", type: "trivia" },
    { id: 55, question: "What is the freezing point of water in Celsius?", options: ["-10°C", "0°C", "10°C", "32°C"], correct: 1, difficulty: 2, category: "Science", type: "trivia" },
    { id: 56, question: "Which element has the atomic symbol 'Fe'?", options: ["Fluorine", "Iron", "Fermium", "Francium"], correct: 1, difficulty: 2, category: "Chemistry", type: "trivia" },
    { id: 57, question: "What year did the Berlin Wall fall?", options: ["1987", "1988", "1989", "1991"], correct: 2, difficulty: 2, category: "History", type: "trivia" },
    { id: 58, question: "Which Norse god is associated with thunder?", options: ["Odin", "Loki", "Thor", "Freya"], correct: 2, difficulty: 2, category: "Mythology", type: "trivia" },
    { id: 59, question: "What is the capital of Greece?", options: ["Sparta", "Athens", "Corinth", "Delphi"], correct: 1, difficulty: 2, category: "Geography", type: "trivia" },
    { id: 60, question: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], correct: 1, difficulty: 2, category: "Science", type: "trivia" },
    { id: 61, question: "What does HTTP stand for?", options: ["HyperText Transfer Protocol", "High Transfer Tech Protocol", "Home Tool Transfer Process", "Hyper Tool Text Process"], correct: 0, difficulty: 2, category: "Technology", type: "trivia" },
    { id: 62, question: "Which metal is liquid at room temperature?", options: ["Gold", "Silver", "Mercury", "Copper"], correct: 2, difficulty: 2, category: "Chemistry", type: "trivia" },
    { id: 63, question: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], correct: 2, difficulty: 2, category: "Geography", type: "trivia" },
    { id: 64, question: "Who wrote '1984'?", options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "Philip K. Dick"], correct: 0, difficulty: 2, category: "Literature", type: "trivia" },
    { id: 65, question: "What is the largest internal organ in the human body?", options: ["Heart", "Liver", "Kidney", "Lung"], correct: 1, difficulty: 2, category: "Biology", type: "trivia" },
    { id: 66, question: "Which country has the most islands?", options: ["Indonesia", "Philippines", "Sweden", "Finland"], correct: 2, difficulty: 2, category: "Geography", type: "trivia" },
    { id: 67, question: "What is the capital of Egypt?", options: ["Alexandria", "Cairo", "Giza", "Luxor"], correct: 1, difficulty: 2, category: "Geography", type: "trivia" },
    { id: 68, question: "How many strings does a cello have?", options: ["4", "6", "8", "10"], correct: 0, difficulty: 2, category: "Music", type: "trivia" },
    { id: 69, question: "What is the capital of Italy?", options: ["Venice", "Milan", "Rome", "Naples"], correct: 2, difficulty: 2, category: "Geography", type: "trivia" },
    { id: 70, question: "Which animal is the fastest land animal?", options: ["Lion", "Gazelle", "Cheetah", "Greyhound"], correct: 2, difficulty: 2, category: "Animals", type: "trivia" },
    { id: 71, question: "What is the main gas in the Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: 2, difficulty: 2, category: "Science", type: "trivia" },
    { id: 72, question: "Who invented the light bulb?", options: ["Benjamin Franklin", "Nikola Tesla", "Thomas Edison", "George Westinghouse"], correct: 2, difficulty: 2, category: "History", type: "trivia" },
    { id: 73, question: "What is the capital of Mexico?", options: ["Cancun", "Mexico City", "Monterrey", "Guadalajara"], correct: 1, difficulty: 2, category: "Geography", type: "trivia" },
    { id: 74, question: "How many chambers does a heart have?", options: ["2", "3", "4", "6"], correct: 2, difficulty: 2, category: "Biology", type: "trivia" },
    { id: 75, question: "What is the deepest part of the ocean?", options: ["Mariana Trench", "Tonga Trench", "Kuril Trench", "Philippine Trench"], correct: 0, difficulty: 2, category: "Geography", type: "trivia" },

    // HARD TRIVIA (76-100)
    { id: 76, question: "What is the second most abundant element in Earth's crust?", options: ["Oxygen", "Silicon", "Aluminum", "Iron"], correct: 1, difficulty: 3, category: "Chemistry", type: "trivia" },
    { id: 77, question: "Which physicist won the Nobel Prize twice?", options: ["Albert Einstein", "Marie Curie", "Niels Bohr", "Max Planck"], correct: 1, difficulty: 3, category: "Science", type: "trivia" },
    { id: 78, question: "What is the capital of Kyrgyzstan?", options: ["Astana", "Bishkek", "Ashgabat", "Dushanbe"], correct: 1, difficulty: 3, category: "Geography", type: "trivia" },
    { id: 79, question: "Who composed 'The Four Seasons'?", options: ["Wolfgang Mozart", "Antonio Vivaldi", "Johann Sebastian Bach", "George Frideric Handel"], correct: 1, difficulty: 3, category: "Music", type: "trivia" },
    { id: 80, question: "Which continent is entirely within the Southern Hemisphere?", options: ["South America", "Africa", "Australia", "Antarctica"], correct: 3, difficulty: 3, category: "Geography", type: "trivia" },
    { id: 81, question: "Who wrote 'One Hundred Years of Solitude'?", options: ["Jorge Luis Borges", "Gabriel García Márquez", "Pablo Neruda", "Octavio Paz"], correct: 1, difficulty: 3, category: "Literature", type: "trivia" },
    { id: 82, question: "What is the chemical formula for sulfuric acid?", options: ["H2SO3", "H2SO4", "HSO4", "H3SO4"], correct: 1, difficulty: 3, category: "Chemistry", type: "trivia" },
    { id: 83, question: "Which country hosted the 1996 Summer Olympics?", options: ["Barcelona", "Atlanta", "Sydney", "Athens"], correct: 1, difficulty: 3, category: "Sports", type: "trivia" },
    { id: 84, question: "What is the name of the largest blood vessel in the body?", options: ["Carotid Artery", "Aorta", "Vena Cava", "Pulmonary Vein"], correct: 1, difficulty: 3, category: "Biology", type: "trivia" },
    { id: 85, question: "Who was the first woman to win a Nobel Prize?", options: ["Lise Meitner", "Marie Curie", "Dorothy Hodgkin", "Irène Joliot-Curie"], correct: 1, difficulty: 3, category: "History", type: "trivia" },
    { id: 86, question: "Which ancient wonder is still standing?", options: ["Hanging Gardens of Babylon", "Great Pyramid of Giza", "Colossus of Rhodes", "Pharos of Alexandria"], correct: 1, difficulty: 3, category: "History", type: "trivia" },
    { id: 87, question: "Who wrote 'Pride and Prejudice'?", options: ["Charlotte Brontë", "Emily Brontë", "Jane Austen", "George Eliot"], correct: 2, difficulty: 3, category: "Literature", type: "trivia" },
    { id: 88, question: "Which river flows through Cairo?", options: ["Tigris", "Euphrates", "Nile", "Jordan"], correct: 2, difficulty: 3, category: "Geography", type: "trivia" },
    { id: 89, question: "Who painted 'The Persistence of Memory'?", options: ["Pablo Picasso", "Salvador Dalí", "Joan Miró", "Marc Chagall"], correct: 1, difficulty: 3, category: "Art", type: "trivia" },
    { id: 90, question: "What is the largest moon of Jupiter?", options: ["Europa", "Io", "Ganymede", "Callisto"], correct: 2, difficulty: 3, category: "Science", type: "trivia" },
    { id: 91, question: "Who wrote 'The Brothers Karamazov'?", options: ["Leo Tolstoy", "Fyodor Dostoevsky", "Ivan Turgenev", "Nikolai Gogol"], correct: 1, difficulty: 3, category: "Literature", type: "trivia" },
    { id: 92, question: "What is the capital of Zimbabwe?", options: ["Harare", "Bulawayo", "Gweru", "Mutare"], correct: 0, difficulty: 3, category: "Geography", type: "trivia" },
    { id: 93, question: "Which element is the most electronegative?", options: ["Oxygen", "Chlorine", "Fluorine", "Nitrogen"], correct: 2, difficulty: 3, category: "Chemistry", type: "trivia" },
    { id: 94, question: "What year did the Challenger space shuttle disaster occur?", options: ["1984", "1985", "1986", "1987"], correct: 2, difficulty: 3, category: "History", type: "trivia" },
    { id: 95, question: "Who was the first African American president of the United States?", options: ["Bill Clinton", "George W. Bush", "Barack Obama", "Donald Trump"], correct: 2, difficulty: 3, category: "History", type: "trivia" },
    { id: 96, question: "What is the capital of Peru?", options: ["Cusco", "Lima", "Arequipa", "Trujillo"], correct: 1, difficulty: 3, category: "Geography", type: "trivia" },
    { id: 97, question: "Who composed 'Moonlight Sonata'?", options: ["Wolfgang Mozart", "Ludwig van Beethoven", "Johann Sebastian Bach", "Franz Schubert"], correct: 1, difficulty: 3, category: "Music", type: "trivia" },
    { id: 98, question: "What is the smallest continent by area?", options: ["Europe", "South America", "Australia", "Antarctica"], correct: 2, difficulty: 3, category: "Geography", type: "trivia" },
    { id: 99, question: "Who discovered penicillin?", options: ["Louis Pasteur", "Alexander Fleming", "Joseph Lister", "Ignaz Semmelweis"], correct: 1, difficulty: 3, category: "Science", type: "trivia" },
    { id: 100, question: "What is the capital of Iceland?", options: ["Akureyri", "Reykjavik", "Hafnarfjörður", "Kópavogur"], correct: 1, difficulty: 3, category: "Geography", type: "trivia" },

    // HARD SPELLING (101-115)
    { id: 101, question: "Which spelling is CORRECT?", options: ["Embarass", "Embarrass", "Embarass", "Embarrass"], correct: 1, difficulty: 3, category: "Spelling", type: "spelling" },
    { id: 102, question: "Which spelling is CORRECT?", options: ["Conscience", "Consciance", "Concsience", "Concheince"], correct: 0, difficulty: 3, category: "Spelling", type: "spelling" },
    { id: 103, question: "Which spelling is CORRECT?", options: ["Maintainence", "Maintenance", "Maintenence", "Maintainance"], correct: 1, difficulty: 3, category: "Spelling", type: "spelling" },
    { id: 104, question: "Which spelling is CORRECT?", options: ["Rhythm", "Rythm", "Rhytm", "Rithm"], correct: 0, difficulty: 3, category: "Spelling", type: "spelling" },
    { id: 105, question: "Which spelling is CORRECT?", options: ["Pneumonia", "Numonia", "Pneunomia", "Pneumonia"], correct: 0, difficulty: 3, category: "Spelling", type: "spelling" },
    { id: 106, question: "Which spelling is CORRECT?", options: ["Conneisseur", "Connoisseur", "Connisseur", "Conoiseur"], correct: 1, difficulty: 3, category: "Spelling", type: "spelling" },
    { id: 107, question: "Which spelling is CORRECT?", options: ["Occassionally", "Ocasionally", "Occasionally", "Occassionally"], correct: 2, difficulty: 3, category: "Spelling", type: "spelling" },
    { id: 108, question: "Which spelling is CORRECT?", options: ["Misspelled", "Mispelled", "Misspeled", "Mispeled"], correct: 0, difficulty: 3, category: "Spelling", type: "spelling" },
    { id: 109, question: "Which spelling is CORRECT?", options: ["Queueing", "Queing", "Qeuing", "Queuuing"], correct: 0, difficulty: 3, category: "Spelling", type: "spelling" },
    { id: 110, question: "Which spelling is CORRECT?", options: ["Diarrhoea", "Diarrhea", "Diarrhea", "Diarrea"], correct: 1, difficulty: 3, category: "Spelling", type: "spelling" },
    { id: 111, question: "Which spelling is CORRECT?", options: ["Bureaucracy", "Burocracy", "Bureaucrasy", "Buraucracy"], correct: 0, difficulty: 3, category: "Spelling", type: "spelling" },
    { id: 112, question: "Which spelling is CORRECT?", options: ["Mischievous", "Mischievious", "Mischievous", "Mischevious"], correct: 0, difficulty: 3, category: "Spelling", type: "spelling" },
    { id: 113, question: "Which spelling is CORRECT?", options: ["Parallel", "Parrallel", "Parallel", "Paralell"], correct: 0, difficulty: 3, category: "Spelling", type: "spelling" },
    { id: 114, question: "Which spelling is CORRECT?", options: ["Accommodate", "Acommodate", "Accomodate", "Accommodate"], correct: 0, difficulty: 3, category: "Spelling", type: "spelling" },
    { id: 115, question: "Which spelling is CORRECT?", options: ["Surveillance", "Surveilance", "Surveylance", "Survaillance"], correct: 0, difficulty: 3, category: "Spelling", type: "spelling" },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [questionShuffled, setQuestionShuffled] = useState([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioContextRef = useRef(null);
  const [gameCount, setGameCount] = useState(0);

  useEffect(() => {
    initializeNewGame();
  }, []);

  const initializeNewGame = () => {
    const availableQuestions = allTriviaQuestions.filter(
      q => !usedQuestionIds.includes(q.id)
    );

    if (availableQuestions.length < 50) {
      const newShuffled = [...allTriviaQuestions].sort(() => Math.random() - 0.5).slice(0, 50);
      setQuestionShuffled(newShuffled);
      setUsedQuestionIds(newShuffled.map(q => q.id));
      setGameCount(gameCount + 1);
    } else {
      const newShuffled = availableQuestions.sort(() => Math.random() - 0.5).slice(0, 50);
      setQuestionShuffled(newShuffled);
      setUsedQuestionIds([...usedQuestionIds, ...newShuffled.map(q => q.id)]);
      setGameCount(gameCount + 1);
    }
  };

  const playSound = (isCorrect) => {
    if (!soundEnabled) return;

    try {
      const audioContext = audioContextRef.current || new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const now = audioContext.currentTime;
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      if (isCorrect) {
        oscillator.frequency.setValueAtTime(523.25, now);
        oscillator.frequency.setValueAtTime(659.25, now + 0.1);
        oscillator.frequency.setValueAtTime(783.99, now + 0.2);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.setValueAtTime(0, now + 0.4);
        oscillator.start(now);
        oscillator.stop(now + 0.4);
      } else {
        oscillator.frequency.setValueAtTime(400, now);
        oscillator.frequency.setValueAtTime(200, now + 0.15);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.setValueAtTime(0, now + 0.3);
        oscillator.start(now);
        oscillator.stop(now + 0.3);
      }
    } catch (e) {
      console.log('Audio playback not supported');
    }
  };

  const question = questionShuffled[currentQuestion];
  const progress = ((currentQuestion + 1) / questionShuffled.length) * 100;

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 1: return 'from-green-400 to-green-500';
      case 2: return 'from-yellow-400 to-yellow-500';
      case 3: return 'from-red-400 to-red-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch(difficulty) {
      case 1: return 'EASY';
      case 2: return 'MEDIUM';
      case 3: return 'HARD';
      default: return 'UNKNOWN';
    }
  };

  const getPointsMultiplier = (difficulty) => {
    switch(difficulty) {
      case 1: return 10;
      case 2: return 25;
      case 3: return 50;
      default: return 10;
    }
  };

  const handleAnswerClick = (index) => {
    if (answered) return;

    setSelectedAnswer(index);
    setAnswered(true);

    const isCorrect = index === question.correct;
    setFeedback(isCorrect);
    playSound(isCorrect);

    if (isCorrect) {
      const points = getPointsMultiplier(question.difficulty) * (1 + streak * 0.1);
      setScore(score + Math.floor(points));
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questionShuffled.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setFeedback(null);
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setGameOver(false);
    setSelectedAnswer(null);
    setAnswered(false);
    setFeedback(null);
    initializeNewGame();
  };

  if (gameOver) {
    const accuracy = Math.round((score / (questionShuffled.length * 50)) * 100);
    
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
          
          .game-bg {
            background: linear-gradient(135deg, #1a0000 0%, #2d0000 25%, #1a0000 50%, #2d0000 75%, #1a0000 100%);
            background-size: 400% 400%;
            animation: bgShift 8s ease infinite;
          }
          
          @keyframes bgShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .game-over-card {
            background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
            border: 4px solid #f59e0b;
            border-radius: 20px;
            box-shadow: 0 0 60px rgba(245, 158, 11, 0.4), inset 0 0 40px rgba(0, 0, 0, 0.8);
            animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            overflow: hidden;
          }
          
          .game-over-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #f59e0b, transparent);
            animation: shimmer 3s infinite;
          }
          
          @keyframes shimmer {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }
          
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(60px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .pulse-glow {
            animation: glowPulse 2s ease-in-out infinite;
          }
          
          @keyframes glowPulse {
            0%, 100% { text-shadow: 0 0 20px rgba(245, 158, 11, 0.5); }
            50% { text-shadow: 0 0 40px rgba(245, 158, 11, 1); }
          }
        `}</style>
        
        <div className="game-bg absolute inset-0"></div>
        
        <div className="relative z-10 max-w-xl w-full">
          <div className="game-over-card p-12 text-center">
            <h1 className="pulse-glow font-black text-6xl text-amber-400 mb-2" style={{fontFamily: 'Bebas Neue'}}>
              GAME OVER
            </h1>
            <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-8"></div>
            
            <div className="mb-8">
              <div className="text-7xl font-black text-amber-300 mb-2" style={{fontFamily: 'Bebas Neue'}}>
                {score}
              </div>
              <p className="text-amber-400 text-lg font-bold tracking-widest">FINAL SCORE</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-black/50 border-2 border-blue-400 rounded-lg p-4">
                <div className="text-2xl font-black text-blue-400" style={{fontFamily: 'Bebas Neue'}}>
                  {questionShuffled.length}
                </div>
                <p className="text-blue-300 text-sm mt-1">QUESTIONS</p>
              </div>
              <div className="bg-black/50 border-2 border-orange-400 rounded-lg p-4">
                <div className="text-2xl font-black text-orange-400" style={{fontFamily: 'Bebas Neue'}}>
                  {streak}
                </div>
                <p className="text-orange-300 text-sm mt-1">MAX STREAK</p>
              </div>
              <div className="bg-black/50 border-2 border-green-400 rounded-lg p-4">
                <div className="text-2xl font-black text-green-400" style={{fontFamily: 'Bebas Neue'}}>
                  {accuracy}%
                </div>
                <p className="text-green-300 text-sm mt-1">ACCURACY</p>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:via-amber-200 hover:to-amber-300 text-black font-black text-xl px-8 py-4 rounded-xl transition transform hover:scale-105 active:scale-95 shadow-xl border-2 border-amber-200 mb-6"
              style={{fontFamily: 'Bebas Neue'}}
            >
              PLAY AGAIN - NEW QUESTIONS
            </button>

            <div className="border-t border-amber-400 pt-6">
              <p className="text-amber-300 text-2xl font-black mb-2" style={{fontFamily: 'Bebas Neue'}}>
                THANK YOU FOR PLAYING! 🎮
              </p>
              <p className="text-gray-300 text-sm mb-3">
                You'll get 50 different questions next time!
              </p>
              <p className="text-amber-400 text-sm tracking-widest font-bold">
                Developed by Engineer Derrick
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!question) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        
        .game-bg {
          background: linear-gradient(135deg, #1a0000 0%, #2d0000 25%, #1a0000 50%, #2d0000 75%, #1a0000 100%);
          background-size: 400% 400%;
          animation: bgShift 8s ease infinite;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
        }
        
        @keyframes bgShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .stage-light {
          position: fixed;
          top: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(ellipse at center, rgba(239, 68, 68, 0.2) 0%, transparent 70%);
          z-index: 1;
        }
        
        .stage-light:nth-child(1) {
          left: 10%;
          animation: flicker 0.2s infinite;
        }
        
        .stage-light:nth-child(2) {
          right: 10%;
          animation: flicker 0.2s infinite 0.1s;
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        .question-card {
          background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
          border: 4px solid #f59e0b;
          border-radius: 20px;
          box-shadow: 0 0 60px rgba(245, 158, 11, 0.3), inset 0 0 40px rgba(0, 0, 0, 0.6);
          animation: slideDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }
        
        .question-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #f59e0b, transparent);
          animation: shimmer 3s infinite;
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .answer-button {
          transition: all 0.3s ease;
          border: 3px solid #1e3a8a;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        
        .answer-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .answer-button:hover:not(:disabled)::before {
          left: 100%;
        }
        
        .answer-button:hover:not(:disabled) {
          transform: translateX(10px);
          box-shadow: 0 0 30px rgba(251, 191, 36, 0.5);
          border-color: #fbbf24;
        }
        
        .answer-button:disabled {
          cursor: default;
        }
        
        .answer-button.correct {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          border-color: #4ade80;
          box-shadow: 0 0 40px rgba(34, 197, 94, 0.8);
          animation: correctPulse 0.6s ease;
        }
        
        .answer-button.incorrect {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          border-color: #f87171;
          box-shadow: 0 0 40px rgba(239, 68, 68, 0.8);
          animation: shake 0.5s ease;
        }
        
        @keyframes correctPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .score-text {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 2px;
          text-shadow: 0 0 10px rgba(251, 191, 36, 0.3);
        }
        
        .feedback-text {
          animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-family: 'Bebas Neue', sans-serif;
        }
        
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.7);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .flame-icon {
          display: inline-block;
          animation: flameFlicker 0.4s ease-in-out infinite;
        }
        
        @keyframes flameFlicker {
          0%, 100% { transform: scaleY(1) scaleX(1); }
          50% { transform: scaleY(1.15) scaleX(0.95); }
        }
        
        .progress-bar {
          height: 6px;
          background: linear-gradient(90deg, #10b981 0%, #eab308 50%, #ef4444 100%);
          border-radius: 3px;
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
          position: relative;
          overflow: hidden;
        }
        
        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmerMove 2s infinite;
        }
        
        @keyframes shimmerMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .sound-toggle {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 50;
          background: rgba(0, 0, 0, 0.6);
          border: 2px solid #f59e0b;
          border-radius: 50%;
          padding: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .sound-toggle:hover {
          background: rgba(0, 0, 0, 0.8);
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
        }
      `}</style>

      <div className="game-bg"></div>
      <div className="stage-light"></div>
      <div className="stage-light"></div>

      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="sound-toggle"
        title={soundEnabled ? "Mute" : "Unmute"}
      >
        {soundEnabled ? (
          <Volume2 className="w-6 h-6 text-amber-400" />
        ) : (
          <VolumeX className="w-6 h-6 text-amber-400" />
        )}
      </button>

      <div className="w-full max-w-3xl relative z-10">
        <div className="mb-8 px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-amber-400 text-sm font-bold tracking-widest mb-1">SCORE</p>
              <div className="score-text text-4xl text-amber-300">{score}</div>
            </div>
            
            <div className="text-center">
              <p className="text-amber-400 text-sm font-bold tracking-widest mb-1">QUESTION</p>
              <div className="score-text text-3xl text-amber-300">{currentQuestion + 1}/50</div>
            </div>
            
            {streak > 0 && (
              <div className="flex flex-col items-center">
                <p className="text-orange-400 text-sm font-bold tracking-widest mb-1">STREAK</p>
                <div className="flex items-center gap-2">
                  <span className="score-text text-3xl text-orange-300">{streak}</span>
                  <Flame className="w-8 h-8 text-orange-500 flame-icon" fill="currentColor" />
                </div>
              </div>
            )}
          </div>
          
          <div className="progress-bar" style={{width: `${progress}%`}}></div>
        </div>

        <div className="question-card p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-2">
              {[1, 2, 3].map(level => (
                <div
                  key={level}
                  className={`w-4 h-4 rounded-full ${
                    level <= question.difficulty
                      ? 'bg-amber-400 shadow-lg shadow-amber-400'
                      : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
            <div className={`px-4 py-1 rounded-full text-black font-black text-sm bg-gradient-to-r ${getDifficultyColor(question.difficulty)}`}>
              {getDifficultyText(question.difficulty)}
            </div>
          </div>

          <h2 className="text-center text-3xl font-black text-white mb-2" style={{fontFamily: 'Bebas Neue'}}>
            {question.question}
          </h2>
          <p className="text-center text-amber-400 text-sm font-bold tracking-widest mb-10">
            {question.category}
          </p>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={answered}
                className={`answer-button w-full text-left text-white py-4 px-6 rounded-xl flex items-center gap-4 ${
                  selectedAnswer === index
                    ? feedback
                      ? 'correct'
                      : 'incorrect'
                    : ''
                } ${
                  answered && index === question.correct ? 'correct' : ''
                }`}
              >
                <span className="text-2xl font-black text-amber-300 min-w-fit">
                  {String.fromCharCode(97 + index).toUpperCase()}.
                </span>
                <span className="text-lg">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {answered && (
          <div className="text-center mb-6 px-4">
            <div className={`feedback-text flex items-center justify-center gap-3 mb-6 ${
              feedback ? 'text-green-400' : 'text-red-400'
            }`}>
              {feedback ? (
                <>
                  <CheckCircle className="w-10 h-10" />
                  <span className="text-3xl font-black" style={{fontFamily: 'Bebas Neue'}}>
                    CORRECT!
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-10 h-10" />
                  <span className="text-3xl font-black" style={{fontFamily: 'Bebas Neue'}}>
                    WRONG!
                  </span>
                </>
              )}
            </div>
            
            {!feedback && (
              <p className="text-gray-300 text-base mb-6">
                The correct answer is: <span className="font-black text-amber-400 text-lg">{question.options[question.correct]}</span>
              </p>
            )}
            
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:via-amber-200 hover:to-amber-300 text-black font-black text-xl px-10 py-4 rounded-xl transition transform hover:scale-110 active:scale-95 shadow-xl border-2 border-amber-200 w-full"
              style={{fontFamily: 'Bebas Neue'}}
            >
              {currentQuestion < questionShuffled.length - 1 ? 'NEXT QUESTION' : 'FINISH'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TriviaGame;
