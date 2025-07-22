let scrambleword = document.getElementById("scramble-word");
let randombtn = document.getElementById("random-btn");
let resetbtn = document.getElementById("reset-btn");
let containerinputs = document.getElementById("container-inputs");
let mistakLetter = document.getElementById("mistak-letter");
let triesScore = document.getElementById("trie");
let wrongDots = Array.from(document.querySelectorAll("#containerDot div"));
// let inputs = Array.from(document.querySelectorAll("#container-inputs input"));
let selectedWord = "";
let tries = 0;
let maxTries = 3;
let mistak = [];
let words = [
  "apple",
  "chair",
  "plant",
  "table",
  "spoon",
  "phone",
  "house",
  "school",
  "market",
  "garden",
  "castle",
  "write",
  "laugh",
  "dance",
  "drive",
  "think",
  "happy",
  "brave",
  "smart",
  "kind",
  "proud",
  "dream",
  "magic",
  "cloud",
  "light",
  "peace",
];

function scrablleWord(word) {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

function getRandomWord() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  selectedWord = randomWord;
  let scrambleWord = scrablleWord(randomWord);
  scrambleword.textContent = scrambleWord;

  containerinputs.innerHTML = "";
  for (let i = 0; i < randomWord.length; i++) {
    let input = document.createElement("input");
    input.dataset.index = i;
    input.maxLength = 1;
    input.addEventListener("input", function (e) {
      handleInput(e);
    });
    containerinputs.appendChild(input);
  }

  let inputs = Array.from(document.querySelectorAll("#container-inputs input"));
  console.log(inputs);
  inputs[0].focus();
}

function handleInput(event) {
  let currentIndex = event.target.dataset.index;
  let currentLetter = selectedWord[currentIndex];
  let userLetter = event.target.value.toLowerCase();

  if (currentLetter !== userLetter) {
    wrongDots[tries].classList.add("wrongDot");
    tries++;
    resetInputs();
    Array.from(document.querySelectorAll("#container-inputs input"))[0].focus();
    mistak.push(userLetter);
    triesScore.textContent = tries;
    mistakLetter.textContent = mistak.join(", ");
    checkGameOver();
    return;
  }
  // console.log(mistak);

  let currentInput = event.target.nextElementSibling;
  if (currentInput) {
    currentInput.focus();
  }

  checkSuccess();
}

randombtn.addEventListener("click", function () {
  getRandomWord();
});
resetbtn.addEventListener("click", function () {
  resetGame();
});

function checkSuccess() {
  let userWord = Array.from(
    document.querySelectorAll("#container-inputs input")
  )
    .map((el) => el.value)
    .join("")
    .toLowerCase();
  // console.log(userWord);
  if (userWord === selectedWord) {
    alert("Winner!!🥇");
    resetGame();
  }
}

function checkGameOver() {
  if (tries >= maxTries) {
    alert(`GameOver!!! ${selectedWord}`);
    resetGame();
  }
}

function resetGame() {
  mistakLetter.innerHTML = "";
  triesScore.textContent = 0;
  scrambleword.innerHTML = "";
  Array.from(document.querySelectorAll("#container-inputs input")).map(
    (el) => (el.value = "")
  );
  wrongDots.map((el) => el.classList.remove("wrongDot"));
  tries = 0;
  mistak = [];
  getRandomWord();
}

function resetInputs() {
  let inputs = Array.from(document.querySelectorAll("#container-inputs input"));
  inputs.forEach((el) => (el.value = ""));
  if (inputs.length > 0) {
    inputs[0].focus();
  }
}
getRandomWord();
