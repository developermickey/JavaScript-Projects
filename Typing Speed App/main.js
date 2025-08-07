const typingText = document.querySelector(".typing-text p"); // ✅ fixed
const input = document.querySelector(".input-field");
const time = document.querySelector(".time span");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");


// set value

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
    const para = ["Avoid dynamic about", "how are you?", "hello", "try again!!!"];
    const randomIndex = Math.floor(Math.random() * para.length);
    typingText.innerHTML = ''; // ✅ now typingText is not null
    for (const char of para[randomIndex]) {
        const span = document.createElement("span");
        span.textContent = char;
        typingText.appendChild(span);
    }

    typingText.querySelectorAll("span")[0].classList.add("active")
    document.addEventListener("keydown", () => {
        input.focus();  
        typingText.addEventListener("click", () => {
            input.focus();
        })
    })
}



// handle user input 

function initTyping(){
    const char = typingText.querySelectorAll("span");
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft > 0){
        if(char[charIndex].innerText === typedChar){
            if(!isTyping){
                timer = setInterval(initTimer, 1000);
                isTyping = true;
            }

            char[charIndex].classList.add("correct");
            console.log("Correct");
        }else {
            char[charIndex].classList.add("incorrect");
            mistake++;
            console.log("Incorrect");
        }
        charIndex++;
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
        char[charIndex].classList.add("active");

    }else {
       clearInterval(timer);
       input.value = "";
    }
}

function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        time.innerText = timeLeft;
        const wpmVal = Math.round(((charIndex - mistake)/5)/(maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;
    }else{
        clearInterval(timer);
    }
}

input.addEventListener("input", initTyping);

loadParagraph();

btn.addEventListener("click", reset);

function reset(){
    loadParagraph();
    clearInterval();
    timeLeft = maxTime;
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    cpm.innerText = 0;
    wpm.innerText = 0;
    mistakes.innerText = 0;
    input.value = "";
}



