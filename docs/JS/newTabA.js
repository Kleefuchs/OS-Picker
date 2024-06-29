
function newTabAify() {
    let aElements = document.getElementsByTagName("a");

    for(index = 0; index < aElements.length; index++) {
        aElements[index].target = "_blank";
        aElements[index].rel="noopener noreferrer"
    }
}