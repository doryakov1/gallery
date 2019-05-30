'use strict'


function checkGameEvent(iDx, jDx) {
    if (gBoard[iDx][jDx].isMarked) return;
    if (gBoard[iDx][jDx].isMine) {
        gLife--;
        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard.length; j++) {
                if (gBoard[i][j].isMine) {
                    if (gLife === 0) {
                        document.querySelector('.lifes').textContent = LIFE + ' : ' + 0;
                        clearInterval(gTimeInterval);
                        renderCell(i, j, MINE)
                        gGame.isOn = false;
                        gGame.gameIsOver = true;
                        if (gSound != null) {
                            gSound.failed.play();
                        }
                    }
                    else {
                        if (gSound != null) {
                            gSound.boom.play();
                        }
                        // if (gLife === 0) setTimeout(function () { checkGameEvent(iDx, jDx) }, 500);
                        document.querySelector('.lifes').textContent = gLife + ' ' + LIFE + ' Left';
                        renderCell(iDx, jDx, MINE)
                        gEmoji.textContent = LOSE;
                        setTimeout(
                            function () {
                                document.querySelector('.lifes').textContent = LIFE + ' : ' + gLife;
                                gEmoji.textContent = HAPPY;
                                renderCell(iDx, jDx, '');
                                undoColorFlag(iDx, jDx);
                            }, 750)
                        return;
                    }
                }

            }
        }
        gEmoji.textContent = LOSE;
    } else {
        if (!gGame.isOn) {
            gGame.isOn = true;
            gTimeInterval = setInterval(timeCounting, 555)
        }


        if (!gBoard[iDx][jDx].isShown) {
            gEmoji.textContent = WIN;
            setTimeout(function () {
                gEmoji.textContent = HAPPY;
            }, 250)
        }

        if (gBoard[iDx][jDx].minesAroundCount > 0) {
            gGame.shownCount++;
            gBoard[iDx][jDx].isShown = true;
            renderCell(iDx, jDx, gBoard[iDx][jDx].minesAroundCount)
            return;
        }
        renderCell(iDx, jDx, '')
        gBoard[iDx][jDx].isShown = true;
        gGame.shownCount++;
        if (gSound != null) {
            gSound.nice.play();
        }
        ifNeighborsIsZero(iDx, jDx);
    }


}


function ifNeighborsIsZero(iDx, jDx) {
    for (var i = iDx - 1; i <= iDx + 1; i++) {
        for (var j = jDx - 1; j <= jDx + 1; j++) {
            if (i < 0 || i >= gLevel.SIZE) continue;
            if (j < 0 || j >= gLevel.SIZE) continue;
            if (gBoard[i][j].isMine) continue;
            if (gBoard[i][j].isMarked) continue;
            if (gBoard[i][j].isShown) continue;
            if (gBoard[i][j].minesAroundCount > 0) {
                gGame.shownCount++;
                // console.table('board after minaround count > 0  ', gBoard);
                gBoard[i][j].isShown = true;
                renderCell(i, j, gBoard[i][j].minesAroundCount)

            } if (gBoard[i][j].minesAroundCount === 0) {
                gBoard[i][j].isShown = true;
                gGame.shownCount++;
                renderCell(i, j, '')
                // console.log(i + ' : ' + j + ' = ', gBoard);
                return ifNeighborsIsZero(i, j)


            }
        }
    }
}

function HintEvent(iDx, jDx) {
    if (!gBoard[iDx][jDx].isShown && !gBoard[iDx][jDx].isMine && !gBoard[iDx][jDx].isMarked) {
        for (var i = iDx - 1; i <= iDx + 1; i++) {
            for (var j = jDx - 1; j <= jDx + 1; j++) {

                if (i < 0 || i >= gBoard.length) continue;
                if (j < 0 || j >= gBoard.length) continue;
                if (gBoard[i][j].isMarked) continue;
                if (gBoard[i][j].isShown) continue;

                if (gBoard[i][j].isMine) {
                    renderCell(i, j, MINE);

                } else if (gBoard[i][j].minesAroundCount > 0) {
                    renderCell(i, j, gBoard[i][j].minesAroundCount)
                    // console.log(gBoard[i][j].minesAroundCount)
                } else {
                    renderCell(i, j, '')
                }


            }
        }
        setTimeout(function () {
            for (var i = iDx - 1; i <= iDx + 1; i++) {
                for (var j = jDx - 1; j <= jDx + 1; j++) {
                    if (i < 0 || i >= gBoard.length) continue;
                    if (j < 0 || j >= gBoard.length) continue;
                    if (gBoard[i][j].isMarked) continue;
                    if (gBoard[i][j].isShown) continue;

                    // if (gBoard[i][j].isMine) {
                    //     undoColorFlag(i, j);
                    //     renderCell(i, j, '');

                    if (gBoard[i][j].minesAroundCount > 0) {
                        renderCell(i, j, '')
                        undoColorFlag(i, j);
                    } else {
                        renderCell(i, j, '')
                        undoColorFlag(i, j);
                    }


                }
            }

            document.querySelector('.hintAlert').textContent = "";
            gHintOn = false;
        }, 1500);
    }
}
