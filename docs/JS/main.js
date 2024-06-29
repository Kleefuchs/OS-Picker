
let questionButtons = document.getElementById("question-buttons");
let questionText = document.getElementById("question-text");

let tree = {
    "name": "undefined",
    "text": "undefined",
    "currentPath": "undefinded",
    "buttons": []
}

function setTree(name, text, buttons, path) {
    tree.name = name;
    tree.text = text;
    tree.buttons = buttons;
    tree.currentPath = path;
}

function createButton(buttonData) {
    let button = document.createElement("button");
    button.onclick = function () {
        init(tree.currentPath + "/" + buttonData.nextPath + "/");
    };
    button.innerHTML = buttonData.text;
    return button;
}

function addButtons() {
    questionButtons.innerHTML = "";
    tree.buttons.forEach((buttonData) => {
        questionButtons.appendChild(createButton(buttonData));
    });
}

function setText() {
    questionText.innerHTML = tree.text;
}

async function init(path) {
    console.log(path)
    await $.getJSON(path + "/index.json", function (data) {
        setTree(data.name, data.text, data.buttons, path);
    });
    await setText();
    await addButtons();
}

init("assets/test");