'use strict'

var MINE = '💣';
var HAPPY = '😊';
var LOSE = '☹️';
var WIN = '😮';
var FLAG = '🏴';
var VICTROY = '😎';
var LIFE = '😇';
var HINT = '💡';

function printBoard(Board, selector) {
    var strHTML = '<table border="1"><tbody><h4 class="lifes">' + LIFE + ' : ' + gLife + '</h4>';
    for (var i = 0; i < Board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < Board.length; j++) {
            var cell = `<span class="Num${Board[i][j].minesAroundCount}"></span>`;
            var idName = i + '-' + j;
            strHTML += '<td onmousedown="WhichButton(event , this)" class="cell" id="' + idName + '"> ' + cell + ' </td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
    // console.log(strHTML)
}

function renderCell(i, j, symbol) {
    var str = '';
    str = `<span class="Num${gBoard[i][j].minesAroundCount}">${symbol}</span>`;
    // console.log(('#' + i + '-' + j)
    var idName = i + '-' + j;
    var elCell = document.getElementById(idName)
    document.getElementById(idName).style.backgroundColor = "#3a1a1a";
    elCell.innerHTML = str;
}

function undoColorFlag(i, j) {
    var idName = i + '-' + j;
    document.getElementById(idName).style.backgroundColor = document.body.style.backgroundColor;
}

function renderScoreAndHints() {
    gHints = 3;
    var str = '';
    for (var i = 0; i < gHints; i++) {
        str += "<span onclick='hintMe()' class='hint'>" + HINT + "</span>";
    }
    document.querySelector('.hints').innerHTML = str;
    if (localStorage.getItem("BestTime") === null) {
        document.querySelector('.bestScore').textContent = "BestTime  50s";
        document.querySelector('.bestScoreName').textContent = "Tal";
    } else {
        document.querySelector('.bestScore').textContent = "BestTime " + localStorage.getItem('BestTime') + 's';
        document.querySelector('.bestScoreName').textContent = localStorage.getItem('Name');
    }
}


function renderHint() {
    var str = '';
    for (var i = 0; i < gHints; i++) {
        str += "<span onclick='hintMe()' class='hint'>" + HINT + "</span>";
    }

    document.querySelector('.hints').innerHTML = str;

}