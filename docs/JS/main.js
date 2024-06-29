let questionText = document.getElementById("question-text");
let questionDescription = document.getElementById("question-description");
let questionButtons = document.getElementById("question-buttons");
let questionLinkText = document.getElementById("question-linktext");
/*
 * Stores all data
*/
let questionData = {
    "name": "",
    "text": "",
    "description": "",
    "currentPath": "",
    "buttons": [],
    "linktext": ""
}

/*
 * Sets the questionData
*/
function setQuestionData(name, text, description, buttons, linktext, path) {
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
        questionData.buttons = [];
    }

    if(linktext!=undefined) {
        questionData.linktext = linktext;
    } else {
        questionData.linktext = "";
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

function createButton(buttonData, index) {
    let button = document.createElement("button");
    button.onclick = function () {
        init(questionData.currentPath + "/" + buttonData.nextPath + "/");
    };
    button.id = "question-button" + index;
    button.className = "question-button";
    button.innerHTML = buttonData.text;
    return button;
}

function addButtons() {
    questionButtons.innerHTML = "";
    let index = 0;
    questionData.buttons.forEach((buttonData) => {
        questionButtons.appendChild(createButton(buttonData, index));
        index++;
    });
}

function setLinkText() {
    questionLinkText.innerHTML = questionData.linktext;
}

async function init(path) {
    console.log(path)
    await $.getJSON(path + "/index.json", function (data) {
        setQuestionData(data.name, data.text, data.description, data.buttons, data.linktext, path);
    });
    await setText();
    await setDescription();
    await addButtons();
    await setLinkText();
}

init("assets/launcher");