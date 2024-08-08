const app = document.querySelector("#content");
const delay = ms => new Promise(res => setTimeout(res, ms));

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 0x0f) >> 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

let sessionUUID = sessionStorage.getItem('sessionUUID');

if (!sessionUUID) {
    sessionUUID = generateUUID();
    sessionStorage.setItem('sessionUUID', sessionUUID);
}


function smallScreen(){
    return window.innerWidth<768;
}

document.addEventListener("keypress", async function(event) {
    if (event.key === "Enter") {
        await delay(150);
        getInputValue();
        removeInput();
        await delay(150);
        new_line();
    }
});

document.addEventListener("click", function(event) {
    event.preventDefault();
    const input = document.querySelector("input");
    input.focus();
});

async function open_terminal() {

    if (smallScreen()) {
        createSmallText("Use desktop for better experience");
        return;
    }

    await delay(300);
    createText(`Welcome ${sessionUUID} v2003.10.26`);
    await delay(700);
    createText("Starting the server...");
    await delay(1500);
    createText("You can run several commands");
    createText("----------------------------");
    createCode("whoami", "About me.");
    createCode("help", "See all commands.");
    createCode("social -a", "All my social networks.");
    await delay(500);
    new_line();
}

function new_line() {

    const container = document.createElement("div");
    container.style.display = "flex";

    const p = document.createElement("p");
    p.textContent = "user@BigBoyBrains>";

    const input = document.createElement("input");
    input.setAttribute("class", "input-field");

    container.appendChild(p);
    container.appendChild(input);

    app.appendChild(container);

    input.focus();
}

function removeInput() {
    const container = document.querySelector(".input-field").parentNode;
    container.parentNode.removeChild(container);
    
}

async function getInputValue() {
    const value = document.querySelector("input").value;
    if (value === "help") {
        
        trueValue(value);
        
        createCode("projects", "Projects I am proud of.");
        createCode("whoami", "About me.");
        createCode("social -a", "All my social networks.");
        createCode("open &lt;social&gt;", "Opens my social media account. Follow me there!")
        createCode("clear", "Clean the terminal.");
    } else if (value === "projects") {
        trueValue(value);
        createText("github.com/BigBoyBrains");
    } else if (value === "whoami") {
        trueValue(value);
        createText("Hi, I am Syeeda Aiemen Dania Saleem! Call me Aiemen :)");
    } else if (value === "social -a") {
        trueValue(value);
        createText("1.  github.com/BigBoyBrains");
        createText("2.  linkedin.com/in/syeeda-aiemen-dania-saleem");
        createText("3.  instagram.com/aiemen38");
    
    } else if (value === "social") {
        trueValue(value);
        createText("Didn't you mean: social -a?");
    }
    else if (value === "open github"){
        trueValue(value);
        createText("Opening Github...")
        createText("Request Complete.")
        await delay(1200);
        handleSocialSelection('1');
    }
    else if (value === "open linkedin"){
        trueValue(value);
        createText("Opening LinkedIn...")
        createText("Request Complete.")
        await delay(1200);
        handleSocialSelection('2');
    }
    else if (value === "open instagram"){
        trueValue(value);
        createText("Opening Instagram...")
        createText("Request Complete.")
        await delay(1200);
        handleSocialSelection('3');
    }
     else if (value === "clear") {
        document.querySelectorAll("p").forEach(e => e.parentNode.removeChild(e));
        document.querySelectorAll("section").forEach(e => e.parentNode.removeChild(e));
    } else {
        falseValue(value);
        createText(`Command not found: ${value}`);
    }
}

function handleSocialSelection(selection) {
    switch(selection) {
        case '1':
            window.open("https://github.com/BigBoyBrains", "_blank");
            break;
        case '2':
            window.open("https://www.linkedin.com/in/syeeda-aiemen-dania-saleem-303905219/", "_blank");
            break;
        case '3':
            window.open("https://instagram.com/aiemen38", "_blank");
            break;
        default:
            createText("Invalid selection.");
    }
}

function trueValue(value) {
    const div = document.createElement("p");
    div.style.display = "flex";
    const mensagem = document.createElement("p");
    mensagem.setAttribute("class", "success");
    mensagem.textContent = `> ${value}`;
    div.appendChild(mensagem);
    app.appendChild(div);
}

function falseValue(value) {
    const div = document.createElement("section");
    div.style.display = "flex";
    const mensagem = document.createElement("p");
    mensagem.setAttribute("class", "error");
    mensagem.textContent = `> ${value}`;
    div.appendChild(mensagem);
    app.appendChild(div);
}

function createText(text) {
    const p = document.createElement("p");
    p.innerHTML = text;
    app.appendChild(p);
}

function createSmallText(text) {
    const smallP = document.createElement("p");
    smallP.setAttribute("class", "typeSmall");
    smallP.innerHTML = text;
    app.appendChild(smallP);
}

function createCode(code, text) {
    const p = document.createElement("p");
    p.setAttribute("class", "code");
    p.innerHTML = `${code} :<span class='text'> ${text} </span>`;
    app.appendChild(p);
}

open_terminal();
