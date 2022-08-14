const inputsContainer = document.querySelector(".inputs"),
  discTitle = document.querySelector(".disc"),
  guessCount = document.querySelector(".guess_count"),
  resetButton = document.querySelector("button"),
  typing = document.querySelector(".typing"),
  succ = new Audio("music/succ.mp3"),
  lose = new Audio("music/lose.mp3"),
  winner = document.querySelector(".winner");

// words
const words = [
  {
    word: "react",
    disc: "JavaScript library",
  },
  {
    word: "vue",
    disc: "JavaScript Framework",
  },
  {
    word: "angular",
    disc: "JavaScript MVW Framework",
  },
  {
    word: "nodejs",
    disc: "JavaScript runtime environment",
  },
  {
    word: "php",
    disc: "general-purpose scripting language",
  },
  {
    word: "ruby",
    disc: "open source programming language",
  },
  {
    word: "python",
    disc: "Programming Language",
  },
  {
    word: "tailwind",
    disc: "A utility-first CSS framework",
  },
  {
    word: "bootstrap",
    disc: "world's most famous free CSS framework",
  },
];

let word,
  maxGuess = 12,
  countToWin = [];
document.addEventListener("keydown", () => typing.focus());
typing.addEventListener("input", startGame);

// handle click resetButton change game
resetButton.addEventListener("click", getRandomWord);

// get Random Word
function getRandomWord() {
  reset();
  let randomObject = words[Math.floor(Math.random() * words.length)];
  let disc = randomObject.disc;
  word = randomObject.word;
  discTitle.innerText = disc;
  guessCount.innerText = maxGuess;
  let inputs = "";
  for (let i = 0; i < word.length; i++) {
    inputs += `<input type="text" disabled/>`;
  }
  inputsContainer.innerHTML = inputs;
}
getRandomWord();

// start game
function startGame(e) {
  let char = e.target.value;
  if (!char.match(/[a-z]/i)) return;
  if (word.includes(char)) {
    for (let i = 0; i < word.length; i++) {
      if (
        word[i] === char &&
        !inputsContainer.querySelectorAll("input")[i].value
      ) {
        inputsContainer.querySelectorAll("input")[i].value = char;
        countToWin.push(char);
      }
    }
  } else {
    maxGuess--;
  }
  guessCount.innerText = maxGuess;
  typing.value = "";

  // winner
  if (countToWin.length === word.length) {
    winner.classList.remove("hidden");
    succ.play();
    countToWin = [];
  }

  // lose
  setTimeout(() => {
    if (maxGuess <= 0) {
      lose.play();
      alert("  😄 انت غبي غبي :)");
      for (let i = 0; i < word.length; i++) {
        inputsContainer.querySelectorAll("input")[i].value = word[i];
      }
      lose.pause();
    }
  });
}

// reset element
function reset() {
  maxGuess = 12;
  winner.classList.add("hidden");
  countToWin = [];
  succ.pause();
}