import "./libs/jquery.js"

class QuestionSystem {
    tree = {
        "name": "undefined",
        "depth": 0,
        "currentPath": "undefinded"
    }
    setTree(name, depth) {
        this.tree.name = name;
        this.tree.depth = depth;
    }
    init(path) {
        $.getJSON(path, function (data) {
            this.setTree(data.name, data.depth)
        });
    }
}