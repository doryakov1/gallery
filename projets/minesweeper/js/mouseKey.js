'use strict'

function WhichButton(event, el) {
    if (!gGame.gameIsOver) {
        var idx = (el.id).split('-');
        onCellMouseClick(event.button, parseInt(idx[0]), parseInt(idx[1]))
    }
}

function onCellMouseClick(event, i, j) {
    var left = 0;
    var right = 2;
    if (gHintOn) {
        HintEvent(i, j);
        return;
    }
    if (event === left) {
        if (gFirstClickIdx.i === -1) {
            gFirstClickIdx.i = i;
            gFirstClickIdx.j = j;
            firstClickGame(i, j)
        }
        checkGameEvent(i, j)
    } else if (event === right) {
        markFlags(i, j);
    }
}


function markFlags(i, j) {
    if (!gGame.isOn) {
        gGame.isOn = true;
        gTimeInterval = setInterval(timeCounting, 555)
    }
    if (gBoard[i][j].isShown) {
        // console.log(i, j, 'isshown')
        return;
    }
    // console.log(gBoard[i][j].isMarked, 'ismarked')

    if (gBoard[i][j].isMarked) {
        // console.log(i, j, 'ismarked')
        gGame.markedCount--;
        document.querySelector('.Flags').textContent++;
        gBoard[i][j].isMarked = false;
        renderCell(i, j, '');
        undoColorFlag(i, j);
        return;
    }
    // console.log(gBoard[i][j].isMarked, 'is not marked')
    // console.log((gGame.markedCount), 'is not marked')
    // if ((gGame.markedCount + 1) > (gLevel.SIZE * gLevel.SIZE)) return;
    // console.log(i, j, 'put flag')
    gGame.markedCount++;
    document.querySelector('.Flags').textContent--;
    gBoard[i][j].isMarked = true;
    renderCell(i, j, FLAG);
}