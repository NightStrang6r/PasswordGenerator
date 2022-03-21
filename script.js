const passAreaEl = document.getElementById("passwordArea"); 
const inputCountEl = document.getElementById("inputCount");
const inputLengthEl = document.getElementById("inputLength");
const generateButEl = document.getElementById("generateButton");

generateButEl.addEventListener("click", generatePasswords);
inputCountEl.addEventListener("keyup", (event) => {checkForLetters(event.target)});
inputLengthEl.addEventListener("keyup", (event) => {checkForLetters(event.target)});

let count;
let length;

generatePasswords();

function generatePasswords() {
    let isFirst = true;

    passAreaEl.innerHTML = "";
    length = inputLengthEl.value;
    count = inputCountEl.value;
    
    if(!length) {
        length = 15;
        inputLengthEl.value = length;
    }
        
    if(!count) {
        count = 18; 
        inputCountEl.value = count;
    }
    
    for(let i = 0; i < count; i++){
        const password = generatePassword(length);
        if(isFirst) {
            isFirst = false;
            passAreaEl.innerHTML = password;
        } else {
            passAreaEl.innerHTML = passAreaEl.innerHTML + "\n" + password;
        }
    }
}

function generatePassword(length) {
    /* Symbols without l and I, because sometimes they look the same */
    const upper = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijkmnopqrstuvwxyz";
    const numbers = "0123456789";

    let symbols = upper + lower + numbers;
    let password = "";
    
    for (var i = 0; i < length; i++) {
        password += symbols.charAt(rand(symbols.length)); 
    }

    if(length >= 6) {
        /* Ensures that the password contains at least 2 uppercase letters, 2 lowercase letters and 2 numbers  */
        for (let i = 0; i < 2; i++) {
            password = replaceAt(password, upper.charAt(rand(upper.length)), rand(password.length));
        }
        for (let i = 0; i < 2; i++) {
            password = replaceAt(password, lower.charAt(rand(lower.length)), rand(password.length));
        }
        for (let i = 0; i < 2; i++) {
            password = replaceAt(password, numbers.charAt(rand(numbers.length)), rand(password.length));
        }
    }

    return password;
}

function checkForLetters(el) {
    el.value = el.value.replace(/[^\d]/g,'');
}

function replaceAt(string, replacement, index) {
    return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}

function rand(to) {
    return Math.floor(Math.random() * to);
}