const app = document.querySelector("#content");
const delay = ms => new Promise(res => setTimeout(res, ms));

function moveCaret(input) {
    const caret = input.nextElementSibling;
    const currTxt = document.createElement('canvas').getContext('2d');
    currTxt.font = getComputedStyle(input).font; 

    const text = input.value;
    const textWidth = currTxt.measureText(text).width;

    caret.style.marginLeft = `${textWidth + 10}px`;
}

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

document.addEventListener("keydown", async function(event) {
    const input = document.querySelector("input.input-field");
    if (event.key === "Enter") {
        event.preventDefault();
        await delay(150);
        getInputValue();
        removeInput();
        await delay(150);
        new_line();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        moveCursor(event);
    } else {
        updateCursor(input);
    }
});

document.addEventListener("click", function(event) {
    event.preventDefault();
    const input = document.querySelector("input");
    input.focus();
});


//----------------------------------------------------------

function createLoadingBar() {
    // Create the container div for the progress bar
    const progressContainer = document.createElement("div");
    progressContainer.setAttribute("id", "myProgress");
    progressContainer.style.width = "100%";
    progressContainer.style.backgroundColor = "grey";

    // Create the inner div for the bar
    const progressBar = document.createElement("div");
    progressBar.setAttribute("id", "myBar");
    progressBar.style.width = "1%";
    progressBar.style.height = "30px";
    progressBar.style.backgroundColor = "green";

    // Append the progress bar to the container
    progressContainer.appendChild(progressBar);

    // Append the progress container to the body or another container
    document.body.appendChild(progressContainer);
}

function moveLoadingBar(callback) {
    let i = 0;
    if (i === 0) {
        i = 1;
        const elem = document.getElementById("myBar");
        let width = 1;
        const id = setInterval(frame, 10);

        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
                // Execute the callback function after the loading bar completes
                if (callback) {
                    callback();
                }
            } else {
                width++;
                elem.style.width = width + "%";
            }
        }
    }
}

async function openTerminal() {

    if (smallScreen()) {
        createSmallText("Use desktop for better experience.");
        return;
    }

    await delay(300);
    createText(`Welcome ${sessionUUID} v2003.10.26`);
    await delay(700);
    createText("Starting the server...");
    await delay(1500);
    createText("You can run several commands");
    createText("----------------------------");
    createCode("help", "See all commands.");
    await delay(500);
    new_line();
}

function new_line() {

    const container = document.createElement("div");
    container.style.display = "flex";

    const p = document.createElement("p");
    p.textContent = "user@BigBoyBrains>";

    const inputContainer = document.createElement("div");
    inputContainer.style.display = "flex";
    inputContainer.setAttribute("class", "input-container");

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "input-box");
    input.setAttribute("class", "input-field");
    input.setAttribute("oninput", "moveCaret(this)");

    const caret = document.createElement("span");
    caret.setAttribute("class", "caret");
    caret.setAttribute("id", "caret");

    inputContainer.appendChild(input);
    inputContainer.appendChild(caret);

    container.appendChild(p);
    container.appendChild(inputContainer);

    app.appendChild(container);

    input.focus();
}

function removeInput() {
    const container = document.querySelector(".input-container").parentNode;
    container.parentNode.removeChild(container);
    
}

async function getInputValue() {
    const value = document.querySelector("input").value;
    if (value === "help") {
        trueValue(value);
        createCode("about", "About me.");
        createCode("resume", "Check out my resume.");
        createCode("social -a", "All my social networks.");
        createCode("open &lt;social&gt;", "Opens my social media account. Follow me there!")
        createCode("snake", "Play the snake game.");
        createCode("clear", "Clean the terminal.");
    } 
    
    else if (value === "resume") {
        trueValue(value);
        createText("Opening resume...");
        window.open('assets/Syeeda-Aiemen-Dania-Saleem.pdf', '_blank');
        createText("Request Complete.")
    } 
    
    else if (value === "snake") {
        trueValue(value);
        createCanvasForSnakeGame();
    }
    
    else if (value === "about") {
        trueValue(value);
        createText("Hi, I am Syeeda Aiemen Dania Saleem! Call me Aiemen :)");
    } 
    
    else if (value === "social -a") {
        trueValue(value);
        createText("1.  github.com/BigBoyBrains");
        createText("2.  linkedin.com/in/syeeda-aiemen-dania-saleem");
        createText("3.  instagram.com/aiemen38");
    
    } 
    
    else if (value === "social") {
        trueValue(value);
        createText("Didn't you mean: social -a?");
    }
    
    else if (value === "open github"){
        trueValue(value);
        createText("Opening Github...")
        createText("Request Complete.")
        await delay(300);
        handleSocialSelection('1');
    }
    
    else if (value === "open linkedin"){
        trueValue(value);
        createText("Opening LinkedIn...")
        createText("Request Complete.")
        await delay(300);
        handleSocialSelection('2');
    }
    
    else if (value === "open instagram"){
        trueValue(value);
        createText("Opening Instagram...")
        createText("Request Complete.")
        await delay(300);
        handleSocialSelection('3');
    }
    
    else if (value === "clear") {
        document.querySelectorAll("p").forEach(e => e.parentNode.removeChild(e));
        document.querySelectorAll("section").forEach(e => e.parentNode.removeChild(e));
    }
    
    else {
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

function createCanvasForSnakeGame() {
    const existingCanvas = document.getElementById("snakeGameCanvas");

    if (existingCanvas) {
        existingCanvas.remove();
    }

    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "snakeGameCanvas");
    canvas.setAttribute("width", "500");
    canvas.setAttribute("height", "500");
    app.appendChild(canvas);

    const scoreElement = document.createElement("p");
    scoreElement.setAttribute("id", "snakeScore");
    scoreElement.style.color = "greenyellow";
    scoreElement.style.fontFamily = "VT323";
    scoreElement.style.fontSize = "30px";
    scoreElement.textContent = "Score: 0";
    app.appendChild(scoreElement);

    const gameOverElement = document.createElement("p");
    gameOverElement.setAttribute("id", "gameOverMessage");
    gameOverElement.style.color = "greenyellow";
    gameOverElement.style.fontFamily = "VT323";
    gameOverElement.style.fontSize = "30px";
    app.appendChild(gameOverElement);

    startSnakeGame(scoreElement, gameOverElement);
    resetEnterPressedFlag();
}

function resetEnterPressedFlag() {
    enterPressed = false;
}

function startSnakeGame(scoreElement, gameOverElement) {
    const canvas = document.getElementById("snakeGameCanvas");
    const context = canvas.getContext("2d");

    const blockSize = 25;
    const rows = 19;
    const cols = 20;
    let snakeX = blockSize * 5;
    let snakeY = blockSize * 5;
    let velocityX = 0;
    let velocityY = 0;
    let snakeBody = [];
    let foodX;
    let foodY;
    let score = 0;
    let gameOver = false;

    placeFood();
    document.addEventListener("keyup", changeDirection);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            enterPressed = true;
        }
    });

    setInterval(update, 1000 / 10);

    function update() {
        if (gameOver) {
            canvas.style.display = 'none';
            return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);

        drawAsciiBorder();

        context.shadowColor = "rgb(150, 167, 124)";
        context.shadowBlur = 5;
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;

        context.fillStyle = "greenyellow";
        context.fillRect(foodX, foodY, blockSize, blockSize);

        if (snakeX == foodX && snakeY == foodY) {
            snakeBody.push([foodX, foodY]);
            score += 10;
            scoreElement.textContent = `Score: ${score}`;
            placeFood();
        }

        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i] = snakeBody[i - 1];
        }
        if (snakeBody.length) {
            snakeBody[0] = [snakeX, snakeY];
        }

        context.shadowColor = "rgb(150, 167, 124)";
        context.shadowBlur = 5;
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;

        context.fillStyle = "greenyellow";
        snakeX += velocityX * blockSize;
        snakeY += velocityY * blockSize;
        context.fillRect(snakeX, snakeY, blockSize, blockSize);
        for (let i = 0; i < snakeBody.length; i++) {
            context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        }

        if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize || enterPressed) {
            gameOver = true;
            gameOverElement.textContent = "Game Over!";
            canvas.style.display = 'none'; 
        }

        for (let i = 0; i < snakeBody.length; i++) {
            if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
                gameOver = true;
                gameOverElement.textContent = "Game Over!";
                canvas.style.display = 'none';
            }
        }
    }

    function drawAsciiBorder() {
        const borderOffset = 9;
        const fontSize = 25;
        context.font = `${fontSize}px VT323`;
        context.fillStyle = "greenyellow";
        context.textAlign = "center";
        const colss = 20;
        const rowss = 20;

        for (let col = 0; col < colss; col++) {
            context.fillText('-', (col + 0.5) * blockSize, borderOffset);
        }

        for (let col = 0; col < colss; col++) {
            context.fillText('-', (col + 0.5) * blockSize, canvas.height - borderOffset);
        }

        for (let row = 0; row < rowss; row++) {
            context.fillText('|', borderOffset, (row + 0.5) * blockSize);
        }

        for (let row = 0; row < rowss; row++) {
            context.fillText('|', canvas.width - borderOffset, (row + 0.5) * blockSize);
        }

        context.fillText('+', borderOffset, borderOffset);
        context.fillText('+', canvas.width - borderOffset, borderOffset);
        context.fillText('+', (borderOffset-7), canvas.height - (borderOffset-7));
        context.fillText('+', canvas.width - (borderOffset-7), canvas.height - (borderOffset-7));
    }
    
    

    function changeDirection(e) {
        if (e.code == "ArrowUp" && velocityY != 1) {
            velocityX = 0;
            velocityY = -1;
        } else if (e.code == "ArrowDown" && velocityY != -1) {
            velocityX = 0;
            velocityY = 1;
        } else if (e.code == "ArrowLeft" && velocityX != 1) {
            velocityX = -1;
            velocityY = 0;
        } else if (e.code == "ArrowRight" && velocityX != -1) {
            velocityX = 1;
            velocityY = 0;
        }
    }

    function placeFood() {
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
    }
}
function resetEnterPressedFlag() {
    enterPressed = false;
}

openTerminal();
