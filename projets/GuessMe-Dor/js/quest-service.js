var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;


function createQuestsTree() {
    gQuestsTree = loadFromStorage('quests');
    console.log(gQuestsTree);
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');

        gQuestsTree.yes = createQuest('Gandhi');

        gQuestsTree.no = createQuest('Rita');

    }
    gCurrQuest = gQuestsTree;

    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt) {
    gPrevQuest[gLastRes] = createQuest(newQuestTxt);
    gPrevQuest[gLastRes].yes = createQuest(newGuessTxt);
    gPrevQuest[gLastRes].no = gCurrQuest;
    saveQuestTree();
}


function saveQuestTree() {
    saveToStorage('quests', gQuestsTree)
}