class commonFunc {
    getElementID(id) {
        return document.getElementById(id);
    }

    getElementsTag(tagName) {
        return document.getElementsByTagName(tagName);
    }

    getElementsClass(className) {
        return document.getElementsByClassName(className);
    }
}


const CF = new commonFunc(); // CF defined common function
