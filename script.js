const passAreaEl = document.getElementById("passwordArea"); 
const inputCountEl = document.getElementById("inputCount");
const inputLengthEl = document.getElementById("inputLength");
const generateButEl = document.getElementById("generateButton");

generateButEl.addEventListener('click', generatePasswords);
inputCountEl.addEventListener('keyup', (event) => {checkForLetters(event.target); saveCount(event.target);});
inputLengthEl.addEventListener('keyup', (event) => {checkForLetters(event.target); saveLength(event.target);});
document.addEventListener('keyup', (event) => {if(event.code != 'Enter') return; generatePasswords();});

let count;
let length;

if(localStorage.plength) {
    inputLengthEl.value = localStorage.plength;
}

if(localStorage.pcount) {
    inputCountEl.value = localStorage.pcount;
}

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

    if(length < 6) {
        for (var i = 0; i < length; i++) {
            password += symbols.charAt(rand(symbols.length)); 
        }

        return password;
    }

    for (var i = 0; i < 2; i++) {
        password += upper.charAt(rand(upper.length));
        password += lower.charAt(rand(lower.length));
        password += numbers.charAt(rand(numbers.length)); 
    }

    for (var i = 0; i < (length - 6); i++) {
        password += symbols.charAt(rand(symbols.length));
    }

    password = shuffle(password);

    return password;
}

function checkForLetters(el) {
    el.value = el.value.replace(/[^\d]/g,'');
}

function rand(to) {
    return Math.floor(Math.random() * to);
}

function shuffle(string) {
    array = string.split('');

    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    string = array.join('');

    return string;
}

function saveCount(el) {
    localStorage.pcount = el.value;
}

function saveLength(el) {
    localStorage.plength = el.value;
}