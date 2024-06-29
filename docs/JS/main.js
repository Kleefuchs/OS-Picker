
let questionButtons = document.getElementById("question-buttons");
let questionDescription = document.getElementById("question-description");
let questionText = document.getElementById("question-text");

//
let questionData = {
    "name": "",
    "text": "",
    "description": "",
    "currentPath": "",
    "buttons": []
}

function setTree(name, text, description, buttons, path) {
    questionData.name = name;
    questionData.text = text;
    if(description!=undefined) {
        questionData.description = description;
    } else {
        questionData.description = "";
    }
    if(buttons!=undefined) {
        questionData.buttons = buttons;
    } else {
        questionButtons.button = [];
    }
    questionData.currentPath = path;
}

function setText() {
    console.log(questionData.description);
    questionText.innerHTML = questionData.text;
}

function setDescription() {
    questionDescription.innerHTML = questionData.description;
}

function createButton(buttonData) {
    let button = document.createElement("button");
    button.onclick = function () {
        init(questionData.currentPath + "/" + buttonData.nextPath + "/");
    };
    button.innerHTML = buttonData.text;
    return button;
}

function addButtons() {
    questionButtons.innerHTML = "";
    questionData.buttons.forEach((buttonData) => {
        questionButtons.appendChild(createButton(buttonData));
    });
}

async function init(path) {
    console.log(path)
    await $.getJSON(path + "/index.json", function (data) {
        setTree(data.name, data.text, data.description, data.buttons, path);
    });
    await setText();
    await setDescription();
    await addButtons();
}

init("assets/test");