'use strict'

// localStorage.clear();

var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gMusic = null;
document.querySelector('.music').textContent = '🔕';
var gSound = createSound();
var gHintOn;
var gHints;
var gFirstClickIdx;
var gTimeInterval;
var gGame;
var gBoard;
var gEmoji = document.querySelector('.emoji');
var gLife;
document.querySelector('.Flags').textContent = 4 * 4;

function init() {
    renderScoreAndHints();
    gLife = 3;
    gFirstClickIdx = {
        i: -1,
        j: -1
    };
    clearInterval(gTimeInterval);
    gEmoji.textContent = HAPPY;
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        gameIsOver: false
    };
    document.querySelector('.timeCount').textContent = gGame.secsPassed + 's';
    gBoard = buildBoard();
    // console.table(gBoard);
    printBoard(gBoard, '.board-container');
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([]);
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };
        }
    }

    return board
}

function dificulut(elDificuluty, elSelectedDificuluty) {
    var allLevel = document.querySelectorAll('h4 span');
    for (var i = 0; i < allLevel.length; i++) {
        allLevel[i].classList.remove("selectedLevel");
        allLevel[i].classList.add("level");
    }
    switch (elDificuluty) {
        case '1':
            gLevel = {
                SIZE: 4,
                MINES: 2,
                DIFICULT: 'easy'
            };
            document.querySelector('.Flags').textContent = 4 * 4;

            elSelectedDificuluty.classList.remove("level");
            elSelectedDificuluty.classList.add("selectedLevel");

            init()
            break;
        case '2':
            gLevel = {
                SIZE: 8,
                MINES: 12,
                DIFICULT: 'medium'
            };
            document.querySelector('.Flags').textContent = 8 * 8;

            elSelectedDificuluty.classList.remove("level");
            elSelectedDificuluty.classList.add("selectedLevel");
            init()
            break;
        case '3':
            gLevel = {
                SIZE: 12,
                MINES: 30,
                DIFICULT: 'hard'
            };
            document.querySelector('.Flags').textContent = 12 * 12;

            elSelectedDificuluty.classList.remove("level");
            elSelectedDificuluty.classList.add("selectedLevel");
            init()
            break;

        default:
            gLevel = {
                SIZE: 4,
                MINES: 2,
                DIFICULT: 'easy'
            };
            document.querySelector('.Flags').textContent = 4 * 4;

            elSelectedDificuluty.classList.remove("level");
            elSelectedDificuluty.classList.add("selectedLevel");
            init()
            break;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


function setMinesNegsCount(board) {
    var newBoard = board;
    for (var i = 0; i < newBoard.length; i++) {
        for (var j = 0; j < newBoard.length; j++) {
            newBoard[i][j].minesAroundCount = (countNeighborsMines(i, j, newBoard));
        }
    }
    return newBoard;
}

function countNeighborsMines(iDx, jDx, newBoard) {
    var count = 0;
    for (var i = iDx - 1; i <= iDx + 1; i++) {
        for (var j = jDx - 1; j <= jDx + 1; j++) {
            if (i === iDx && j === jDx) continue;
            if (i < 0 || i >= newBoard.length) continue;
            if (j < 0 || j >= newBoard.length) continue;
            if (newBoard[i][j].isMine) count++;
        }
    }
    return count;
}

function timeCounting() {

    document.querySelector('.timeCount').textContent = gGame.secsPassed++ + 's';
    checkVictroy()
}

function checkVictroy() {

    // console.log(gGame.shownCount, gLevel.SIZE * gLevel.SIZE - gLevel.MINES)

    // console.log(gGame.markedCount, gLevel.MINES)

    if (!(gGame.shownCount === (gLevel.SIZE * gLevel.SIZE - gLevel.MINES))) return;
    if (!(gGame.markedCount === (gLevel.MINES))) return;


    clearInterval(gTimeInterval);
    gEmoji.textContent = VICTROY;
    gGame.isOn = false;
    gGame.gameIsOver = true;
    if (gSound != null) {
        gSound.win.play();
    }
    if (gLevel.DIFICULT === 'hard') {
        if (localStorage.getItem("BestTime") === null) {
            localStorage.setItem('BestTime', gGame.secsPassed);
            localStorage.setItem('Name', prompt('Hello new player , what is your name?'));
            document.querySelector('.bestScore').textContent = "BestTime " + gGame.secsPassed + 's';
            document.querySelector('.bestScoreName').textContent = localStorage.getItem('Name');
        } else if (gGame.secsPassed < localStorage.getItem('BestTime')) {
            localStorage.setItem('BestTime', gGame.secsPassed);
            localStorage.setItem('Name', prompt('you are good! , what is your name?'));
            document.querySelector('.bestScore').textContent = "BestTime " + localStorage.getItem('BestTime') + 's';
            document.querySelector('.bestScoreName').textContent = localStorage.getItem('Name');
        } else {
            document.querySelector('.bestScore').textContent = "BestTime " + localStorage.getItem('BestTime') + 's';
            document.querySelector('.bestScoreName').textContent = localStorage.getItem('Name');
        }
    }
}

function firstClickGame(i, j) {
    var iDx = i;
    var jDx = j;

    for (var i = 0; i < gLevel.MINES; i++) {

        var randIdx = getRandomInt(0, gLevel.SIZE - 1);
        var randJdx = getRandomInt(0, gLevel.SIZE - 1);

        if (gBoard[randIdx][randJdx].isMarked) continue;
        if (randIdx === iDx && randJdx === jDx) continue;

        gBoard[randIdx][randJdx].isMine = true;
    }

    var newBoard = setMinesNegsCount(gBoard);

    gBoard = newBoard;

    printBoard(gBoard, '.board-container')

    checkGameEvent(iDx, jDx)
}

function hintMe() {
    if (!gGame.isOn) {
        document.querySelector('.hintAlert').textContent = "Game is not on!";
        setTimeout(function() {
            document.querySelector('.hintAlert').textContent = "";
        }, 2000)
        return;
    }
    if (gHints) {
        gHints--;
        if (gSound != null) {
            gSound.hintSound.play();
        }
        document.querySelector('.hintAlert').textContent = "Hint On!";
        gHintOn = true;
        renderHint()
    }
}

function toggleSound() {
    if (gSound !== null) {
        gSound = null;
        document.querySelector('.sound').textContent = '🔇';

    } else {
        document.querySelector('.sound').textContent = '🔊';
        gSound = createSound();
    }

}

function toggleMusic() {

    if (gMusic !== null) {
        document.querySelector('.music').textContent = '🔕';
        gMusic.pause();
        gMusic = null;
    } else {
        gMusic = new Audio('sound/music.mp3');
        document.querySelector('.music').textContent = '🎵';
        gMusic.play();
    }

}



function createSound() {
    var sound = {
        win: new Audio('sound/win.mp3'),
        failed: new Audio('sound/failed.mp3'),
        nice: new Audio('sound/nice.mp3'),
        boom: new Audio('sound/boom.mp3'),
        hintSound: new Audio('sound/hint.mp3'),
    };
    return sound
};