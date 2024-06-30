let questionText = document.getElementById("question-text");
let questionDescription = document.getElementById("question-description");
let questionImages = document.getElementById("question-images");
let questionButtons = document.getElementById("question-buttons");
let questionLinkText = document.getElementById("question-linktext");

let treeFolderOriginal = "assets";

/*
 * Stores all data
*/
let questionData = {
    "name": "",
    "imagePath": "",
    "text": "",
    "description": "",
    "currentPath": "",
    "buttons": [],
    "linktext": ""
}

/*
 * Sets the questionData
 * Has some safety checks implemented
*/

function setQuestionData(name, text, imagePath, description, buttons, linktext, path) {
    if(name!=undefined) {
        questionData.name = name;
    } else {
        questionData.name = "Standard Name";
    }

    questionData.imagePath = imagePath;
    
    if(text!=undefined) {
        questionData.text = text;
    } else {
        questionData.text = "";
    }

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

/*
 * Creates an image from a path
*/

function createImage(imagePath, index) {
    let image = document.createElement("img");
    image.src = imagePath;
    image.className = "question-image";
    image.id = "question-image" + index;
    return image;
}

/*
 * Adds Images to the div for images
*/

function addImages() {
    questionImages.innerHTML = "";
    if(questionData.imagePath==undefined) {
        return;
    }
    questionImages.appendChild(createImage(questionData.currentPath + "/" + questionData.imagePath, 0));
}

/*
 * Sets the text on the website
*/

function setText() {
    questionText.innerHTML = questionData.text;
}

/*
 * Sets the description
*/

function setDescription() {
    questionDescription.innerHTML = questionData.description;
}

/*
 * Creates a button object to append to the button div
*/

function createButton(buttonData, index) {
    let button = document.createElement("button");
    button.onclick = function () {
        init(questionData.currentPath + "/" + buttonData.nextPath);
    };
    button.id = "question-button" + index;
    button.className = "question-button";
    button.innerHTML = buttonData.text;
    return button;
}

/*
 * Adds the buttons
*/

function addButtons() {
    questionButtons.innerHTML = "";
    {
        let index = 0;
        questionData.buttons.forEach((buttonData) => {
            questionButtons.appendChild(createButton(buttonData, index));
            index++;
        });
    }
    if(questionData.currentPath!=treeFolderOriginal) {
        let backButton = document.createElement("button");
        backButton.innerHTML = "Zurück";
        backButton.id = "question-button-back";
        backButton.className = "question-button";
        backButton.onclick = function () {
            let count = 0;
            for(let index = questionData.currentPath.length - 1; index >= 0; index--) {
                if(questionData.currentPath[index]=='/') {
                    questionData.currentPath = questionData.currentPath.slice(0, index - questionData.currentPath.length);
                    break;
                }
                count++;
            }
            init(questionData.currentPath);
        }
        questionButtons.appendChild(backButton);
    }
}

/*
 * Sets the Link Text
*/

function setLinkText() {
    questionLinkText.innerHTML = questionData.linktext;
}

/*
 * Initialises the questionData and page based on the index.json in the specified folder
*/

async function init(path) {
    console.log(path);
    await $.getJSON(path + "/index.json", function (data) {
        setQuestionData(data.name, data.text, data.imagePath, data.description, data.buttons, data.linktext, path);
    });
    await setText();
    await addImages();
    await setDescription();
    await addButtons();
    await setLinkText();
    await newTabAify();
}

init(treeFolderOriginal);